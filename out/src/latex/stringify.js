import * as lp from './latex_parser_types';
function stringifyArray(arry, options) {
    const len = arry.length;
    let ret = '';
    for (let i = 0; i < len; i++) {
        const cur = arry[i];
        ret += stringify(cur, options);
        if (lp.isSpace(cur) || lp.isSoftbreak(cur) || lp.isCommandParameter(cur) || lp.isSubscript(cur) || lp.isSuperscript(cur)) {
            continue;
        }
        if (i + 1 < len && lp.isTextString(arry[i + 1])) {
            ret += ' ';
            continue;
        }
        if (i + 1 < len && lp.isMathCharacter(arry[i + 1]) && !lp.isMathCharacter(cur)) {
            ret += ' ';
            continue;
        }
        if (i + 1 < len && lp.isCommand(cur) && cur.args.length === 0 && lp.isCommandParameter(arry[i + 1])) {
            ret += ' ';
            continue;
        }
    }
    return ret;
}
/**
 * Converts nodes to a LaTeX string.
 * @param node Nodes to be converted to a LaTeX string.
 * @param options
 */
export function stringify(node, options = { lineBreak: '' }) {
    const lineBreak = options.lineBreak;
    if (Array.isArray(node)) {
        return stringifyArray(node, options);
    }
    if (lp.isTextString(node)) {
        return node.content;
    }
    if (lp.isCommand(node)) {
        return '\\' + node.name + stringifyArray(node.args, options);
    }
    if (lp.isAmsMathTextCommand(node)) {
        return '\\text{' + node.arg + '}';
    }
    if (lp.isDefCommand(node)) {
        return '\\def' + node.token + stringifyArray(node.args, options);
    }
    if (lp.isUrlCommand(node)) {
        return `\\url{${node.url}}`;
    }
    if (lp.isHrefCommand(node)) {
        const content = stringifyArray(node.content, options);
        if (node.arg) {
            return '\\href' + stringify(node.arg, options) + `{${node.url}}{${content}}`;
        }
        else {
            return `\\href{${node.url}}{${content}}`;
        }
    }
    if (lp.isLabelCommand(node)) {
        return `\\${node.name}{${node.label}}`;
    }
    if (lp.isEnvironment(node) || lp.isMathEnv(node) || lp.isMathEnvAligned(node)) {
        const begin = '\\begin{' + node.name + '}';
        const args = stringifyArray(node.args, options);
        const content = stringifyArray(node.content, options);
        const end = '\\end{' + node.name + '}';
        return begin + args.trim() + lineBreak + content.trim() + lineBreak + end + lineBreak;
    }
    if (lp.isGroup(node)) {
        return '{' + stringifyArray(node.content, options) + '}';
    }
    if (lp.isOptionalArg(node)) {
        return '[' + stringifyArray(node.content, options) + ']';
    }
    if (lp.isParbreak(node)) {
        return '\\par' + lineBreak;
    }
    if (lp.isSpace(node)) {
        return ' ';
    }
    if (lp.isSoftbreak(node)) {
        return '\n';
    }
    if (lp.isLinebreak(node)) {
        return '\\\\';
    }
    if (lp.isSuperscript(node)) {
        if (node.arg) {
            return '^' + stringify(node.arg, options);
        }
        else {
            return '^';
        }
    }
    if (lp.isSubscript(node)) {
        if (node.arg) {
            return '_' + stringify(node.arg, options);
        }
        else {
            return '_';
        }
    }
    if (lp.isAlignmentTab(node)) {
        return '&';
    }
    if (lp.isCommandParameter(node)) {
        return '#' + node.nargs;
    }
    if (lp.isActiveCharacter(node)) {
        return '~';
    }
    if (lp.isIgnore(node)) {
        return '';
    }
    if (lp.isVerb(node)) {
        return '\\verb' + node.escape + node.content + node.escape;
    }
    if (lp.isVerbatim(node)) {
        return '\\begin{verbatim}' + node.content + '\\end{verbatim}' + lineBreak;
    }
    if (lp.isMinted(node)) {
        const args = stringify(node.args);
        return '\\begin{minted}' + args + node.content + '\\end{minted}' + lineBreak;
    }
    if (lp.isLstlisting(node)) {
        const arg = node.arg ? stringify(node.arg) : '';
        return '\\begin{lstlisting}' + arg + node.content + '\\end{lstlisting}';
    }
    if (lp.isInlienMath(node)) {
        return '$' + stringifyArray(node.content, options) + '$';
    }
    if (lp.isDisplayMath(node)) {
        return '\\[' + lineBreak + stringifyArray(node.content, options).trim() + lineBreak + '\\]' + lineBreak;
    }
    if (lp.isMathCharacter(node)) {
        return node.content;
    }
    if (lp.isMatchingDelimiters(node)) {
        return '\\left' + node.left + stringifyArray(node.content, options) + '\\right' + node.right;
    }
    if (lp.isMathDelimiters(node)) {
        return node.lcommand + node.left + stringifyArray(node.content, options) + node.rcommand + node.right;
    }
    // node must be the never type here.
    const dummy = node;
    return dummy;
}
//# sourceMappingURL=stringify.js.map