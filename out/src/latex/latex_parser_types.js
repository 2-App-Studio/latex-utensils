/**
 * Defines node types of LaTeX AST.
 *
 * Users don't have to import this module directly.
 */
export function isTextString(node) {
    return !!node && node.kind === 'text.string';
}
export function isCommand(node) {
    return !!node && node.kind === 'command';
}
export function isAmsMathTextCommand(node) {
    return !!node && node.kind === 'command.text';
}
export function isDefCommand(node) {
    return !!node && node.kind === 'command.def';
}
export function isUrlCommand(node) {
    return !!node && node.kind === 'command.url';
}
export function isHrefCommand(node) {
    return !!node && node.kind === 'command.href';
}
export function isLabelCommand(node) {
    return !!node && node.kind === 'command.label';
}
export function isEnvironment(node) {
    return !!node && node.kind === 'env';
}
export function isMathEnv(node) {
    return !!node && node.kind === 'env.math.align';
}
export function isMathEnvAligned(node) {
    return !!node && node.kind === 'env.math.aligned';
}
export function isGroup(node) {
    return !!node && node.kind === 'arg.group';
}
export function isOptionalArg(node) {
    return !!node && node.kind === 'arg.optional';
}
export function isParbreak(node) {
    return !!node && node.kind === 'parbreak';
}
export function isSpace(node) {
    return !!node && node.kind === 'space';
}
export function isSoftbreak(node) {
    return !!node && node.kind === 'softbreak';
}
export function isLinebreak(node) {
    return !!node && node.kind === 'linebreak';
}
export function isSuperscript(node) {
    return !!node && node.kind === 'superscript';
}
export function isSubscript(node) {
    return !!node && node.kind === 'subscript';
}
export function isAlignmentTab(node) {
    return !!node && node.kind === 'alignmentTab';
}
export function isCommandParameter(node) {
    return !!node && node.kind === 'commandParameter';
}
export function isActiveCharacter(node) {
    return !!node && node.kind === 'activeCharacter';
}
export function isIgnore(node) {
    return !!node && node.kind === 'ignore';
}
export function isVerb(node) {
    return !!node && node.kind === 'verb';
}
export function isVerbatim(node) {
    return !!node && node.kind === 'env.verbatim';
}
export function isMinted(node) {
    return !!node && node.kind === 'env.minted';
}
export function isLstlisting(node) {
    return !!node && node.kind === 'env.lstlisting';
}
export function isInlienMath(node) {
    return !!node && node.kind === 'inlineMath';
}
export function isDisplayMath(node) {
    return !!node && node.kind === 'displayMath';
}
export function isMathCharacter(node) {
    return !!node && node.kind === 'math.character';
}
export function isMatchingDelimiters(node) {
    return !!node && node.kind === 'math.matching_delimiters';
}
export function isMathDelimiters(node) {
    return !!node && node.kind === 'math.math_delimiters';
}
export function hasContent(node) {
    return !!node && node.hasOwnProperty('content');
}
export function hasContentArray(node) {
    return !!node && node.hasOwnProperty('content') && Array.isArray(node['content']);
}
export function hasArgsArray(node) {
    return !!node && node.hasOwnProperty('args') && Array.isArray(node['args']);
}
export function isElement(node) {
    return !!node && !isSpace(node) && !isSoftbreak(node);
}
export function isAstRoot(ast) {
    return ast.kind === 'ast.root';
}
export function isAstPreamble(ast) {
    return ast.kind === 'ast.preamble';
}
//# sourceMappingURL=latex_parser_types.js.map