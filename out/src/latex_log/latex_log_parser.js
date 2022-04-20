import * as llpSimple from './latex_log_parser_simple';
import * as llpWithTrace from './latex_log_parser_trace';
import { TimeKeeper } from '../pegjs/timeout';
export * from './latex_log_types';
export { isSyntaxError } from '../pegjs/pegjs_types';
export function parse(s, optArg) {
    const option = optArg ? Object.assign({}, optArg) : undefined;
    if (option && option.timeout) {
        if (typeof option.timeout !== 'object') {
            option.timeout = new TimeKeeper(option.timeout);
        }
    }
    if (option && option.tracer) {
        return llpWithTrace.parse(s, option);
    }
    else {
        return llpSimple.parse(s, option);
    }
}
//# sourceMappingURL=latex_log_parser.js.map