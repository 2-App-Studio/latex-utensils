/**
 * LaTeX parser.
 *
 * @example
 * ```ts
 * import {latexParser as lp} from 'latex-utensils'
 *
 * const ast = lp.parse('a $b+c$ d')
 * const pat = lp.pattern(lp.isInlienMath)
 *               .child(lp.isMathCharacter)
 * const ret0 = pat.matchAll(ast.content)
 * const ret1 = lp.find(ast.content, lp.isInlienMath)
 * ```
 */
import * as lpSimple from './latex_parser_simple';
import * as lpWithTrace from './latex_parser_trace';
import { TimeKeeper } from '../pegjs/timeout';
export { find, findAll, findAllSequences, findNodeAt } from './find_all';
export { pattern } from './matcher';
export { stringify } from './stringify';
export * from './latex_parser_types';
export { isSyntaxError } from '../pegjs/pegjs_types';
/**
 * Parses a LaTeX document and returns a LaTeX AST.
 * @param texString LaTeX document to be parsed.
 * @param optArg Options.
 *
 * @example
 * ```ts
 * import {latexParser} from 'latex-utensils'
 *
 * const ast = latexParser.parse('a $b+c$ d')
 * ```
 */
export function parse(texString, optArg) {
    const option = optArg ? Object.assign({}, optArg) : undefined;
    if (option && option.timeout) {
        if (typeof option.timeout !== 'object') {
            option.timeout = new TimeKeeper(option.timeout);
        }
    }
    if (option && option.tracer) {
        return lpWithTrace.parse(texString, option);
    }
    else {
        return lpSimple.parse(texString, option);
    }
}
/**
 *
 * @param texString
 * @param optArg
 */
export function parsePreamble(texString, optArg) {
    const timeout = optArg && optArg.timeout;
    return parse(texString, { startRule: 'Preamble', timeout });
}
//# sourceMappingURL=latex_parser.js.map