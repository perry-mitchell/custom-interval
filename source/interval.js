const MULTIPLIED_VALUE = /^\d+x\d+$/i;
const SINGLE_VALUE = /^\d+$/;

/**
 * Clear a running interval
 * @param {CustomIntervalTracker} tracker The interval to clear
 * @example
 *  const interval = setCustomInterval(callback, 5000);
 *  clearCustomInterval(interval);
 */
function clearCustomInterval({ _, __ }) {
    clearTimeout(_);
    clearTimeout(__);
}

function expandIntervals(items) {
    return items.reduce((intervals, item) => {
        if (MULTIPLIED_VALUE.test(item)) {
            const [multipier, delay] = item.split(/x/i).map(val => parseInt(val, 10));
            const newItems = [...intervals];
            for (let i = 0; i < multipier; i += 1) {
                newItems.push(delay);
            }
            return newItems;
        }
        if (SINGLE_VALUE.test(item) !== true) {
            throw new Error(`Invalid interval delay: Expected whole number (ms): ${item}`);
        }
        return [...intervals, parseInt(item, 10)];
    }, []);
}

/**
 * @typedef {Object} SetCustomIntervalOptions
 * @property {Boolean=} immediate Immediately fire the callback (default=false)
 */

/**
 * Tracker variable for custom intervals (used for clearing)
 * @typedef {Object} CustomIntervalTracker
 */

/**
 * Set a custom interval timer
 * @param {Function} callback The function to execute when the interval fires
 * @param {Number|Array.<String|Number>} intervals An interval in milliseconds or
 *  an array of interval values. Values will be used and shifted-off the array
 *  until only one is left, which will be used continuously beyond that point.
 * @param {SetCustomIntervalOptions=} options Optional configuration options
 * @returns {CustomIntervalTracker} A tracker for the newly started interval
 * @example
 *  // Basic interval
 *  setCustomInterval(() => {}, 1500);
 *  // Interval with 2 delay counts, clearing after it
 *  const interval = setCustomInterval(() => {}, [100, 500]);
 *  // Later:
 *  clearCustomInterval(interval);
 *  // Interval with value expansion:
 *  setCustomInterval(cb, [100, "5x250", 500]);
 */
function setCustomInterval(callback, intervals, { immediate = false } = {}) {
    const currentIntervals = expandIntervals(Array.isArray(intervals) ? intervals : [intervals]);
    const context = {};
    if (immediate) {
        context.__ = setTimeout(callback, 0);
    }
    const tick = () => {
        context._ = setTimeout(() => {
            context.__ = setTimeout(callback, 0);
            tick();
        }, shiftInterval(currentIntervals));
    };
    tick();
    return context;
}

function shiftInterval(intervals) {
    if (intervals.length > 1) {
        return intervals.shift();
    } else if (intervals.length <= 0) {
        throw new Error("No interval values available for custom interval");
    }
    return intervals[0];
}

module.exports = {
    clearCustomInterval,
    expandIntervals,
    setCustomInterval,
    shiftInterval
};
