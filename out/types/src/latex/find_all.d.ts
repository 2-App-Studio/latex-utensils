import { Node } from './latex_parser_types';
export declare type Typeguard<T extends Node> = ((x: Node) => x is T) | ((x: Node) => boolean);
export declare function getChildNodes(node: Node): Node[];
/**
 * A finder result.
 */
export declare type FindResult<T extends Node, P extends Node = Node> = {
    /**
     * The found node.
     */
    node: T;
    /**
     * The parent node of the found node.
     */
    parent?: FindResult<P>;
};
/**
 * Find a node satisfying `typeguard` in `nodes` traversely.
 * @param nodes The array of nodes where to be searched.
 * @param typeguard If this is actually a type guard, the matched result will be typed.
 * @param parent internal-use only.
 */
export declare function find<T extends Node>(nodes: Node[], typeguard?: Typeguard<T>, parent?: FindResult<Node>): FindResult<T> | undefined;
/**
 * Find all the nodes satisfying `typeguard` in `nodes` traversely.
 * @param nodes The array of nodes where to be searched.
 * @param typeguard If this is actually a type guard, the matched result will be typed.
 * @param parent internal-use only.
 */
export declare function findAll<T extends Node>(nodes: Node[], typeguard?: Typeguard<T>, parent?: FindResult<Node>): FindResult<T>[];
export declare type SequenceResult<Ts extends Node[], P extends Node = Node> = {
    nodes: Ts;
    parent?: FindResult<P>;
};
/** @ignore */
export declare function findAllSequences<T extends Node>(nodes: Node[], typeguards: [Typeguard<T>], parent?: FindResult<Node>): SequenceResult<[T]>[];
/** @ignore */
export declare function findAllSequences<T1 extends Node, T2 extends Node>(nodes: Node[], typeguards: [Typeguard<T1>, Typeguard<T2>], parent?: FindResult<Node>): SequenceResult<[T1, T2]>[];
/** @ignore */
export declare function findAllSequences<T1 extends Node, T2 extends Node, T3 extends Node>(nodes: Node[], typeguards: [Typeguard<T1>, Typeguard<T2>, Typeguard<T3>], parent?: FindResult<Node>): SequenceResult<[T1, T2, T3]>[];
/** @ignore */
export declare function findAllSequences<T1 extends Node, T2 extends Node, T3 extends Node, T4 extends Node>(nodes: Node[], typeguards: [Typeguard<T1>, Typeguard<T2>, Typeguard<T3>, Typeguard<T4>], parent?: FindResult<Node>): SequenceResult<[T1, T2, T3, T4]>[];
/** @ignore */
export declare function findAllSequences<T1 extends Node, T2 extends Node, T3 extends Node, T4 extends Node, T5 extends Node>(nodes: Node[], typeguards: [Typeguard<T1>, Typeguard<T2>, Typeguard<T3>, Typeguard<T4>, Typeguard<T5>], parent?: FindResult<Node>): SequenceResult<[T1, T2, T3, T4, T5]>[];
/**
 * Find all the sequences of nodes satisfying `typeguard[]` in `nodes` traversely.
 * @param nodes The array of nodes where to be searched.
 * @param typeguards The array of `typeguard`s. Each node must satisfy each `typeguard`, respectively.
 *                   If this is actually a type guard, the matched result will be typed.
 * @param parent internal-use only.
 */
export declare function findAllSequences(nodes: Node[], typeguards: Typeguard<Node>[], parent?: FindResult<Node>): SequenceResult<Node[]>[];
/**
 * Gives priority to line and column over offset.
 */
export declare type Position = PositionLc | PositionOs;
/**
 * Line and column-based position.
 */
export declare type PositionLc = {
    /**
     * The one-based line value.
     */
    line: number;
    /**
     * The one-based column value.
     */
    column: number;
    /**
     * The zero-based offset value.
     */
    offset?: number;
    includeStart?: boolean;
    includeEnd?: boolean;
};
/**
 * Offset-based position.
 */
export declare type PositionOs = {
    /**
     * The one-based line value.
     */
    line?: number;
    /**
     * The one-based column value.
     */
    column?: number;
    /**
     * The zero-based offset value.
     */
    offset: number;
    includeStart?: boolean;
    includeEnd?: boolean;
};
/**
 * Find a node at the position.
 * @param nodes The array of nodes where to be searched
 * @param pos
 * @param parent internal-use only
 */
export declare function findNodeAt(nodes: Node[], pos: Position, parent?: FindResult<Node>): FindResult<Node> | undefined;
