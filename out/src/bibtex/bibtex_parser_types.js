export function isEntry(e) {
    return !isStringEntry(e) && !isPreambleEntry(e);
}
export function isStringEntry(e) {
    return e.entryType === 'string';
}
export function isPreambleEntry(e) {
    return e.entryType === 'preamble';
}
export function isTextStringValue(e) {
    return e.kind === 'text_string';
}
export function isNumberValue(e) {
    return e.kind === 'number';
}
export function isAbbreviationValue(e) {
    return e.kind === 'abbreviation';
}
export function isConcatValue(e) {
    return e.kind === 'concat';
}
//# sourceMappingURL=bibtex_parser_types.js.map