# markdown-api
add an API section to a markdown file from a simple javascript API documented using JSDoc

## rationale

I wanted to create a way to document simple APIs that I release on github. The source file(s) need to include JSDoc commenting. The program simply pastes the JSDoc header and function name into the markdown file (usually README.md) at the API tag. It does no fancy parsing of the source file but instead includes one line after the comment block.

## example

See the [generated README file](https://github.com/davidfig/markdown-api/blob/master/docs/README.results.md) in the [docs/ directory](https://github.com/davidfig/markdown-api/blob/master/docs/) 

## installation

    npm i markdown-api -g

## command-line example

    $ markdown-api index.js README.md
    Wrote index.js API documentation to README.md.

    $ markdown-api --help

    Usage: markdown-api [options] <markdown-file> <source-files...>

    add an API section to a markdown file from a simple javascript API documented using JSDoc. source-files may be glob patterns; each source file will be included only once 

    Options:

        -V, --version         output the version number
        -a, --API <string>    tag for API marking in MARKDOWN-FILE. defaults to "API"
        -e, --EOL <string>    end of line character for reqriting markdown file. defaults to "\n"
        -o, --out <filename>  filename to write the results. defaults to overriding original markdown file
        -h, --help            output usage information    
        -p, --append          append to the end of the API section instead of deleting the current API section
        -h, --header          include filename as a heading at the start of the API section
        -i, --private         include @private tagged blocks

## API
```js
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
```
## License  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
