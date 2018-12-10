const MULTIPLIED_VALUE = /^\d+x\d+$/i;
const SINGLE_VALUE = /^\d+$/;

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

function setCustomInterval(callback, intervals, { immediate = false } = {}) {
    const currentIntervals = expandIntervals(Array.isArray(intervals ? intervals : [intervals]));
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
    setCustomInterval
};
