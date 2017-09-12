#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')
const program = require('commander')
const glob = require('glob')

const HEADER_MARKER = '%%%filename%%%'
const COMMENT_START = '/**'
const COMMENT_END = '*/'
let outFile
let sourceGlobs, sourceFilenames = [], markdownFilename, comments = []

program
    .version('0.1.0')
    .arguments('<markdown-file> <source-file...>')
    .description('add an API section to a markdown file from a simple javascript API documented using JSDoc. source-files may be glob patterns; each source file will be included only once')
    .action((markdown, source) => { markdownFilename = markdown; sourceGlobs = source })
    .option('-a, --API <string>', 'tag for API marking in MARKDOWN-FILE. defaults to "API"')
    .option('-e, --EOL <string>', 'end of line character for reqriting markdown file. defaults to "\\n"')
    .option('-o, --out <filename>', 'filename to write the results. defaults to overriding original markdown file')
    .option('-p, --append', 'append to the end of the API section instead of deleting the current API section')
    .option('-h --header', 'include filename as a heading at the start of the section')
    .parse(process.argv)

program.API = program.API || 'API'
program.EOL = program.EOL || '\n'

outFile = program.out || markdownFilename

if (!sourceGlobs || !sourceGlobs.length || !markdownFilename)
{
    program.outputHelp()
    process.exit(1)
}

function parseSource(filename)
{
    if (program.header)
    {
        comments.push(HEADER_MARKER + filename)
    }
    let inComment
    const lineReader = readline.createInterface({ input: fs.createReadStream(filename) })
    lineReader.on('line',
        function (line)
        {
            if (inComment)
            {
                if (inComment.lastLine)
                {
                    inComment.lines.push(line)
                    comments.push(...inComment.lines)
                    inComment = null
                }
                else if (line.trim().indexOf(COMMENT_END) !== -1)
                {
                    inComment.lines.push(line)
                    inComment.lastLine = true
                }
                else
                {
                    inComment.lines.push(line)
                }
            }
            else
            {
                if (line.trim().indexOf(COMMENT_START) !== -1)
                {
                    inComment = { lines: [program.EOL + line] }
                }
            }
        }
    )
    lineReader.on('close',
        function ()
        {
            parseFile()
        }
    )
}

function outputComments(inAPI)
{
    let results = ''
    let inside = false
    for (let i = 0; i < comments.length; i++)
    {
        const line = comments[i]
        if (line.indexOf(HEADER_MARKER) !== -1)
        {
            if (inside)
            {
                results += '```' + program.EOL
            }
            const filename = line.replace(HEADER_MARKER, '')
            for (let i = 0; i < inAPI + 1; i++)
            {
                results += '#'
            }
            results += ' ' + filename + program.EOL
            results += '```' + program.EOL
            inside = true
        }
        else
        {
            results += line + program.EOL
        }
    }
    if (inside)
    {
        results += '```' + program.EOL
    }
    return results
}

function parseMarkdown()
{
    let results = ''
    let inAPI
    const lineReader = readline.createInterface({ input: fs.createReadStream(markdownFilename) })
    lineReader.on('line',
        function (line)
        {
            if (inAPI)
            {
                if (line[0] === '#' && line[inAPI] !== '#')
                {
                    results += outputComments(inAPI)
                    inAPI = false
                }
                else if (program.append)
                {
                    results += line + program.EOL
                }
            }
            else
            {
                if (line[0] === '#' && line.substr(line.indexOf('# ') + 2).trim().indexOf(program.API) !== -1)
                {
                    inAPI = line.indexOf('# ') + 1
                    results += line + program.EOL
                }
                else
                {
                    results += line + program.EOL
                }
            }
        }
    )
    lineReader.on('close',
        function ()
        {
            if (inAPI)
            {
                results += outputComments(inAPI)
            }
            fs.writeFileSync(outFile, results)
            console.log('Wrote API documentation to ' + outFile + '.')
        }
    )
}

function parseFile()
{
    if (sourceFilenames.length)
    {
        parseSource(sourceFilenames.shift())
    }
    else
    {
        parseMarkdown()
    }
}

for (let filename of sourceGlobs)
{
    const files = glob.sync(filename)
    for (let file of files)
    {
        if (sourceFilenames.indexOf(file) === -1)
        {
            sourceFilenames.push(file)
        }
    }
}

parseFile()