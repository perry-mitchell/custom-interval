const sleep = require("sleep-promise");
const { clearCustomInterval, expandIntervals, setCustomInterval, shiftInterval } = require("../../source/interval.js");

describe("interval", function() {
    describe("expandIntervals", function() {
        it("retains basic number values", function() {
            expect(expandIntervals([1, 2])).to.deep.equal([1, 2]);
        });

        it("converts strings to numbers", function() {
            expect(expandIntervals([50, "500"])).to.deep.equal([50, 500]);
        });

        it("expands multipliers", function() {
            expect(expandIntervals(["2x50", 100])).to.deep.equal([50, 50, 100]);
            expect(expandIntervals(["1x10"])).to.deep.equal([10]);
        });

        it("throws for invalid values", function() {
            expect(() => expandIntervals(["x150"])).to.throw(/Invalid interval delay/i);
            expect(() => expandIntervals([1.5])).to.throw(/Invalid interval delay/i);
            expect(() => expandIntervals(["1x"])).to.throw(/Invalid interval delay/i);
            expect(() => expandIntervals(["1.5x200"])).to.throw(/Invalid interval delay/i);
        });
    });

    describe("setCustomInterval", function() {
        it("fires a callback after some time", function() {
            const spy = sinon.spy();
            const interval = setCustomInterval(spy, 150);
            return sleep(75)
                .then(() => {
                    expect(spy.notCalled).to.be.true;
                    return sleep(80);
                })
                .then(() => {
                    expect(spy.calledOnce).to.be.true;
                    clearCustomInterval(interval);
                });
        });

        it("can fire a callback immediately", function() {
            const spy = sinon.spy();
            const interval = setCustomInterval(spy, 150, { immediate: true });
            return sleep(1)
                .then(() => {
                    expect(spy.calledOnce).to.be.true;
                    clearCustomInterval(interval);
                });
        });

        it("changes the delay over time", function() {
            const spy = sinon.spy();
            const interval = setCustomInterval(spy, ["2x50", 75, 125]);
            return sleep(360)
                .then(() => {
                    expect(spy.callCount).to.equal(4);
                    clearCustomInterval(interval);
                });
        });
    });

    describe("shiftInterval", function() {
        it("shifts a value of an array", function() {
            const items = [1, 2, 3];
            expect(shiftInterval(items)).to.equal(1);
            expect(items).to.deep.equal([2, 3]);
        });

        it("always returns and preserves the last value", function() {
            const items = [3];
            expect(shiftInterval(items)).to.equal(3);
            expect(items).to.deep.equal([3]);
        });

        it("throws if the array is empty", function() {
            expect(() => shiftInterval([])).to.throw(/No interval values available/i);
        });
    });
});
