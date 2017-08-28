#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')
const program = require('commander')

const COMMENT_START = '/**'
const COMMENT_END = '*/'
let outFile
let sourceFilename, markdownFilename, comments = []

program
    .version('0.0.1')
    .arguments('<source-file> <markdown-file>')
    .description('add an API section to a markdown file from a simple javascript API documented using JSDoc')
    .action((source, markdown) => { sourceFilename = source; markdownFilename = markdown })
    .option('-a, --API <string>', 'tag for API marking in MARKDOWN-FILE. defaults to "## API"')
    .option('-e, --EOL <string>', 'end of line character for reqriting markdown file. defaults to "\\n"')
    .option('-o, --out <filename>', 'filename to write the results. defaults to overriding original markdown file')
    .parse(process.argv)

program.API = program.API || '## API'
program.EOL = program.EOL || '\n'
outFile = program.out || markdownFilename

if (!sourceFilename || !markdownFilename)
{
    program.outputHelp()
    process.exit(1)
}

function parseSource()
{
    let inComment
    const lineReader = readline.createInterface({ input: fs.createReadStream(sourceFilename) })
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
            parseMarkdown()
        }
    )
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
                if (line[0] === '#')
                {
                    inAPI = false
                    results += '```'
                    for (let i = 0; i < comments.length; i++)
                    {
                        results += comments[i] + (i !== comments.length - 1 ? program.EOL : '')
                    }
                    results += program.EOL + '```'
                    results += program.EOL + line + program.EOL
                }
            }
            else
            {
                if (line.trim().indexOf(program.API) !== -1)
                {
                    inAPI = true
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
            fs.writeFileSync(outFile, results)
            console.log('Wrote ' + sourceFilename + ' API documentation to ' + outFile + '.')
        }
    )
}

parseSource()