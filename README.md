# markdown-api
add an API section to a markdown file from a simple javascript API documented using JSDoc

## rationale

I wanted to create API markdown to document simple APIs that I release on github. The source file needs to include JSDoc commenting. The program simply pastes the JSDoc header and function name into the markdown file (usually README.md) at the API tag. It does no fancy parsing of the source file.

## example

See the [generated README file](https://github.com/davidfig/markdown-api/blob/master/docs/README.results.md) in the [docs/ directory](https://github.com/davidfig/markdown-api/blob/master/docs/) 

## installation

    npm i markdown-api -g

## command-line example

    $ markdown-api index.js README.md
    Wrote index.js API documentation to README.md.

    $ markdown-api --help

    Usage: markdown-api [options] <source-file> <markdown-file>

    add an API section to a markdown file from a simple javascript API documented using JSDoc

    Options:

        -V, --version         output the version number
        -a, --API <string>    tag for API marking in MARKDOWN-FILE. defaults to "API"
        -e, --EOL <string>    end of line character for reqriting markdown file. defaults to "\n"
        -o, --out <filename>  filename to write the results. defaults to overriding original markdown file
        -h, --help            output usage information    
        -p, --append          append to the end of the API section instead of deleting the current API section
        -h, --header          include filename as a heading at the start of the API section

## License  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)