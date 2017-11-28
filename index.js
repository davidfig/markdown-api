const fs = require('fs')
const readline = require('readline')
const glob = require('glob')

const HEADER_MARKER = '%%%filename%%%'
const COMMENT_START = '/*' + '*'
const COMMENT_END = '*/'
let program
let sourceFilenames = [], markdownFilename, comments = []

function parseSource(filename)
{
    if (program.header)
    {
        comments.push(HEADER_MARKER + filename)
    }
    let inComment, first = true
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
                    if (!program.private && line.indexOf('@private') !== -1)
                    {
                        inComment = null
                    }
                    else
                    {
                        inComment.lines.push(line)
                    }
                }
            }
            else
            {
                if (line.trim().indexOf(COMMENT_START) !== -1)
                {
                    inComment = { lines: [(first ? '' : program.EOL) + line]  }
                    first = false
                }
            }
        }
    )
    lineReader.on('close',
        function ()
        {
            comments.push('')
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
            results += '```' + program.language + program.EOL
            inside = true
        }
        else
        {
            if (!inside)
            {
                results += '```' + program.language + program.EOL
                inside = true
            }
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
                    results += line + program.EOL
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
            fs.writeFileSync(program.out, results)
            console.log('Wrote API documentation to ' + program.out + '.')
        }
    )
}

function parseFile(first)
{
    if (sourceFilenames.length)
    {
        parseSource(sourceFilenames.shift(), first === true)
    }
    else
    {
        parseMarkdown()
    }
}

/**
 * replace API section in markdown file (usually README.md)
 * @param {string} markdown filename and path
 * @param {string[]} source files or globs
 * @param {options} [options]
 * @param {string} [options.API=API] tag for API marking in markdown file
 * @param {string} [options.EOL=\n] end of line character for writing markdown file
 * @param {string} [options.out=markdown] filename to write the results
 * @param {boolean} [options.append] append to the end of the API section instead of deleting the current API section
 * @param {boolean} [options.header] include filename as a heading at the start of the section
 * @param {boolean} [options.private] include private tagged blocks
 * @param {string} [options.language=js] use this language tag for highlighting code blocks
 */
function markdown(markdown, source, options)
{
    for (let filename of source)
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

    markdownFilename = markdown
    program = options
    program.API = program.API || 'API'
    program.EOL = program.EOL || '\n'
    program.language = program.language || 'js'
    program.out = program.out || markdownFilename
    parseFile(true)
}

module.exports = markdown