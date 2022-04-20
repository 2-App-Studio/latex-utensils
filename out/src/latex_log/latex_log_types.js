export function isFileStack(e) {
    return e.kind === 'file_stack';
}
export function isTexError(e) {
    return e.kind === 'tex_error';
}
export function isLatexmkError(e) {
    return e.kind === 'latexmk_error';
}
export function isLogText(e) {
    return e.kind === 'text_string';
}
export function isPageNumber(e) {
    return e.kind === 'page_number';
}
//# sourceMappingURL=latex_log_types.js.map