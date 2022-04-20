export class TimeoutError extends Error {
    constructor(s) {
        super(s);
    }
}
export class TimeKeeper {
    constructor(timeout) {
        this.timeout = timeout;
        this._start = Date.now();
    }
    check() {
        const now = Date.now();
        if ((now - this._start) > this.timeout) {
            throw new TimeoutError('could not complete parsing within the given time.');
        }
    }
}
//# sourceMappingURL=timeout.js.map