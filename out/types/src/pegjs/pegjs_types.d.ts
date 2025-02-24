/**
 * Defines classes and types for PEG.js.
 *
 * Users don't have to import this module directly.
 *
 */
/** */
import { TimeKeeper } from './timeout';
/**
 * The location of a node.
 */
export declare type Location = {
    start: {
        /**
         * The zero-based offset value.
         */
        offset: number;
        /**
         * The one-based line value.
         */
        line: number;
        /**
         * The one-based column value.
         */
        column: number;
    };
    end: {
        /**
         * The zero-based offset value.
         */
        offset: number;
        /**
         * The one-based line value.
         */
        line: number;
        /**
         * The one-based column value.
         */
        column: number;
    };
};
export declare function isLocation(x: any): x is Location;
export declare class SyntaxErrorBase extends Error {
    message: string;
    expected: string | null;
    found: string | null;
    location: Location;
    name: 'SyntaxError';
}
export declare class SyntaxError extends SyntaxErrorBase {
}
export declare function isSyntaxError(x: any): x is SyntaxError;
export interface ParserOptions {
    startRule?: string;
    tracer?: Tracer;
    timeout?: number | TimeKeeper;
}
export declare type TraceArg = {
    type: 'rule.enter' | 'rule.match' | 'rule.fail';
    rule: string;
    result: any;
    location: Location;
};
export declare type Tracer = {
    trace: (e: TraceArg) => any;
};
