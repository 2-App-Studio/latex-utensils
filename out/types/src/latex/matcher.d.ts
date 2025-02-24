import { Node } from './latex_parser_types';
import type { Typeguard } from './find_all';
/**
 * A matcher result.
 */
export declare type MatchResult<T extends Node, P extends Pattern<Node, any> | undefined> = {
    /**
     * The matched node.
     */
    node: T;
    /**
     * The parent node of the matched node.
     */
    parent: P extends undefined ? undefined : MatchResult<NonNullable<P>['target'], NonNullable<P>['parentPattern']>;
};
export declare type MatchOptions = {
    /**
     * If `true`, the pattern matching can begin within child nodes given
     * to {@link Pattern.match} and {@link Pattern.matchAll}.
     *
     * @default false
     *
     * @example
```ts
const texString = 'a $x + y$ b'
const ast = lp.parse(texString)
const pat = lp.pattern(lp.isMathCharacter)
const result = pat.match(ast.content) // undefined
```
     * @example
```ts
const texString = 'a $x + y$ b'
const ast = lp.parse(texString)
const pat = lp.pattern(lp.isMathCharacter)
const result = pat.match(ast.content, {traverseAll: true})
result?.node.content // 'x'
```
     */
    traverseAll: boolean;
};
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
export declare class Pattern<T extends Node, ParentPattern extends Pattern<Node, any> | undefined = undefined> {
    /**
     * Type guard to check whether nodes match.
     */
    readonly typeguard: Typeguard<T>;
    /**
     * Parent pattern.
     */
    readonly parentPattern: ParentPattern;
    /** @ignore */
    target: T;
    /** @ignore */
    constructor(typeguard: Typeguard<T>, parentPattern: ParentPattern);
    /**
     * Returns a pattern whose parent pattern is `this`. The pattern matches if `typeguard` returns `true`.
     * @param typeguard A type guard of the child pattern.
     */
    child<C extends Node>(typeguard: (x: Node) => x is C): Pattern<C, Pattern<T, ParentPattern>>;
    /**
     * Returns a pattern whose parent pattern is `this`. The pattern matches if `typeguard` returns `true`.
     * @param typeguard A callback of the child pattern.
     */
    child(typeguard: (x: Node) => boolean): Pattern<Node, Pattern<T, ParentPattern>>;
    /**
     * Returns a node in the child nodes if matched. Returns `undefined` if not matched.
     * Its parent node must match its {@link parentPattern}.
     *
     * @param nodes Array of nodes to search.
     * @param opt Options of search.
     */
    match(nodes: Node[], opt?: MatchOptions): MatchResult<T, ParentPattern> | undefined;
    /**
     * Returns the array of all the matched node. Returns an empty array if not matched.
     * Their parent node must match {@link parentPattern}.
     * @param nodes Array of nodes to search.
     * @param opt Options of search.
     */
    matchAll(nodes: Node[], opt?: MatchOptions): MatchResult<T, ParentPattern>[];
}
/**
 * Returns a pattern. The pattern matches if `typeguard` returns `true`.
 * @param typeguard Type guard to check whether nodes match.
 */
export declare function pattern<T extends Node>(typeguard: (x: Node) => x is T): Pattern<T, undefined>;
/**
 * Returns a pattern. The pattern matches if `typeguard` returns `true`.
 * @param typeguard Type guard to check whether nodes match.
 */
export declare function pattern(typeguard: (x: Node) => boolean): Pattern<Node, undefined>;
