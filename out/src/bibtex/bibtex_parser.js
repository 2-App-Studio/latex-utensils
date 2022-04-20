import * as _bibtexParser from './bibtex_parser_simple';
import * as _bibtexParserWithTrace from './bibtex_parser_trace';
import { TimeKeeper } from '../pegjs/timeout';
export * from './bibtex_parser_types';
export { isSyntaxError, SyntaxError } from '../pegjs/pegjs_types';
export function parse(s, _option) {
    const option = _option ? Object.assign({}, _option) : undefined;
    if (option && option.timeout) {
        if (typeof option.timeout !== 'object') {
            option.timeout = new TimeKeeper(option.timeout);
        }
    }
    if (option && option.tracer) {
        return _bibtexParserWithTrace.parse(s, option);
    }
    else {
        return _bibtexParser.parse(s, option);
    }
}
//# sourceMappingURL=bibtex_parser.js.map