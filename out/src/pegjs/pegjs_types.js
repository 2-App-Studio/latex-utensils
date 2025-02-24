/**
 * Defines classes and types for PEG.js.
 *
 * Users don't have to import this module directly.
 *
 */
export function isLocation(x) {
    var _a, _b, _c, _d, _e, _f;
    const ret = ((_a = x === null || x === void 0 ? void 0 : x.start) === null || _a === void 0 ? void 0 : _a.offset) !== undefined &&
        ((_b = x === null || x === void 0 ? void 0 : x.start) === null || _b === void 0 ? void 0 : _b.line) !== undefined &&
        ((_c = x === null || x === void 0 ? void 0 : x.start) === null || _c === void 0 ? void 0 : _c.column) !== undefined &&
        ((_d = x === null || x === void 0 ? void 0 : x.end) === null || _d === void 0 ? void 0 : _d.offset) !== undefined &&
        ((_e = x === null || x === void 0 ? void 0 : x.end) === null || _e === void 0 ? void 0 : _e.line) !== undefined &&
        ((_f = x === null || x === void 0 ? void 0 : x.end) === null || _f === void 0 ? void 0 : _f.column) !== undefined;
    return ret;
}
export class SyntaxErrorBase extends Error {
}
export class SyntaxError extends SyntaxErrorBase {
}
export function isSyntaxError(x) {
    const ret = (x === null || x === void 0 ? void 0 : x.message) !== undefined && isLocation(x === null || x === void 0 ? void 0 : x.location) && (x === null || x === void 0 ? void 0 : x.name) === 'SyntaxError' && x instanceof Error;
    return ret;
}
//# sourceMappingURL=pegjs_types.js.map