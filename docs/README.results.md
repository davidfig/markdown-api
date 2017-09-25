# TEST FILE
This is a test readme

## USAGE
This is where usage would go

## API
### docs/test.js
```
/**
 * points in rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
function rect(x, y, width, height)

/**
 * points in arc
 * @param {number} x
 * @param {number} y
 * @param {number} start angle (radians)
 * @param {number} end angle (radians)
 * @param {number} radius
 */
function arc(x, y, start, end, radius)

/**
 * rounded rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number|object} radius
 * @param {number} [radius.topLeft]
 * @param {number} [radius.topRight]
 * @param {number} [radius.bottomLeft]
 * @param {number} [radius.bottomRight]
 */
function roundedRect(x, y, width, height, radius)

/**
 * line with thickness
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number|object} [thickness]
 * @param {number} thickness.start
 * @param {number} thickness.end
 */
function line(x1, y1, x2, y2, thickness)

/**
 * circle
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 */
function circle(x, y, radius)
```
## license  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
