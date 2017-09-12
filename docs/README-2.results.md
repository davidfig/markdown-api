# TEST FILE 2
Much simpler with no footer

# API
## docs/test.js
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
 * Adjustable rounded rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {object} radii
 * @param {number} [radii.topLeft]
 * @param {number} [radii.topRight]
 * @param {number} [radii.bottomLeft]
 * @param {number} [radii.bottomRight]
 */
function roundedRectEach(x, y, width, height, radii)

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
## docs/test2.js
```
/**
 * class Animate.wait
 */
module.exports = class wait extends EventEmitter

    /**
     * @param {object|object[]} object or list of objects to animate
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values n: continue animation n times
     * @param {number} [options.id] user-generated id (e.g., I use it to properly load animations when an object has multiple animations running)
     * @param {boolean} [options.orphan] delete animation if .parent of object (or first object in list) is null
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function|string} [options.ease] function (or penner function name) from easing.js (see http://easings.net for examples)*
     * @emits {done} animation expires
     * @emits {cancel} animation is cancelled
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, options)
```
