import { find, findAll, getChildNodes } from './find_all';
/**
 * @example
```ts
import {latexParser as lp} from 'latex-utensils'

const texString = 'a $x + y$ b'
const ast = lp.parse(texString)
const childPat = lp.pattern(lp.isInlienMath).child(lp.isMathCharacter)
const result = childPat.match(ast.content)
result?.node.content // 'x'
```
 */
export class Pattern {
    /** @ignore */
    constructor(typeguard, parentPattern) {
        this.typeguard = typeguard;
        this.parentPattern = parentPattern;
    }
    child(typeguard) {
        const childMatcher = new Pattern(typeguard, this);
        return childMatcher;
    }
    /**
     * Returns a node in the child nodes if matched. Returns `undefined` if not matched.
     * Its parent node must match its {@link parentPattern}.
     *
     * @param nodes Array of nodes to search.
     * @param opt Options of search.
     */
    match(nodes, opt = { traverseAll: false }) {
        if (!this.parentPattern) {
            if (opt.traverseAll) {
                const result = find(nodes, this.typeguard);
                if (result) {
                    return { node: result.node, parent: undefined };
                }
            }
            else {
                for (const node of nodes) {
                    if (this.typeguard(node)) {
                        return { node, parent: undefined };
                    }
                }
            }
        }
        else {
            const parentMatchResults = this.parentPattern.matchAll(nodes, opt);
            for (const parentMatchResult of parentMatchResults) {
                const parentNode = parentMatchResult.node;
                const childNodes = getChildNodes(parentNode);
                for (const node of childNodes) {
                    if (this.typeguard(node)) {
                        return { node, parent: parentMatchResult };
                    }
                }
            }
        }
        return undefined;
    }
    /**
     * Returns the array of all the matched node. Returns an empty array if not matched.
     * Their parent node must match {@link parentPattern}.
     * @param nodes Array of nodes to search.
     * @param opt Options of search.
     */
    matchAll(nodes, opt = { traverseAll: false }) {
        const ret = [];
        if (!this.parentPattern) {
            if (opt.traverseAll) {
                const results = findAll(nodes, this.typeguard);
                for (const result of results) {
                    ret.push({ node: result.node, parent: undefined });
                }
            }
            else {
                for (const node of nodes) {
                    if (this.typeguard(node)) {
                        ret.push({ node, parent: undefined });
                    }
                }
            }
        }
        else {
            const parentMatchResults = this.parentPattern.matchAll(nodes, opt);
            for (const parentMatchResult of parentMatchResults) {
                const parentNode = parentMatchResult.node;
                const childNodes = getChildNodes(parentNode);
                for (const node of childNodes) {
                    if (this.typeguard(node)) {
                        ret.push({ node, parent: parentMatchResult });
                    }
                }
            }
        }
        return ret;
    }
}
export function pattern(typeguard) {
    return new Pattern(typeguard, undefined);
}
//# sourceMappingURL=matcher.js.map