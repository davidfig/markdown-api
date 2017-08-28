# markdown-api
add an API section to a markdown file from a simple javascript API documented using JSDoc

## rationale

I wanted to create API markdown to document simple APIs that I release on github. The source file needs to include JSDoc commenting. The program simply pastes the JSDoc header and function name into the markdown file (usually README.md) at the API tag.

## example

See the docs/ directory 

## installation

    npm i markdown-api

## command-line example

    $ markdown-api index.js README.md
    Wrote index.js API documentation to README.md.

    $ markdown-api --help

    Usage: markdown-api [options] <source-file> <markdown-file>

    add an API section to a markdown file from a simple javascript API documented using JSDoc

    Options:

        -V, --version         output the version number
        -a, --API <string>    tag for API marking in MARKDOWN-FILE. defaults to "## API"
        -e, --EOL <string>    end of line character for reqriting markdown file. defaults to "\n"
        -o, --out <filename>  filename to write the results. defaults to overriding original markdown file
        -h, --help            output usage information    

## License  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)