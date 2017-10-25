#!/usr/bin/env node

const program = require('commander')
const markdown = require('.')
const pack = require('./package.json')

let markdownFilename, sourceGlobs

program
    .version(pack.version)
    .arguments('<markdown-file> <source-file...>')
    .description('add an API section to a markdown file from a simple javascript API documented using JSDoc. source-files may be glob patterns; each source file will be included only once')
    .action((markdown, source) => { markdownFilename = markdown; sourceGlobs = source })
    .option('-a, --API <string>', 'tag for API marking in MARKDOWN-FILE. defaults to "API"')
    .option('-e, --EOL <string>', 'end of line character for writing markdown file. defaults to "\\n"')
    .option('-o, --out <filename>', 'filename to write the results. defaults to overriding original markdown file')
    .option('-p, --append', 'append to the end of the API section instead of deleting the current API section')
    .option('-h, --header', 'include filename as a heading at the start of the section')
    .option('-i, --private', 'include @private tagged blocks')
    .option('-l, --language <lang>', 'change from default js for highlighting code blocks')
    .parse(process.argv)

if (!sourceGlobs || !sourceGlobs.length || !markdownFilename)
{
    program.outputHelp()
    process.exit(1)
}

markdown(markdownFilename, sourceGlobs, program)