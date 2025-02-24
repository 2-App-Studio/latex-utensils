/**
 * Defines node types of LaTeX AST.
 *
 * Users don't have to import this module directly.
 */
/** */
import { Location } from '../pegjs/pegjs_types';
export declare type TextString = {
    kind: 'text.string';
    content: string;
    location: Location;
};
export declare function isTextString(node: Node | undefined): node is TextString;
export declare type Command = {
    kind: 'command';
    name: string;
    args: (OptionalArg | Group)[];
    location: Location;
};
export declare function isCommand(node: Node | undefined): node is Command;
export declare type AmsMathTextCommand = {
    kind: 'command.text';
    arg: Group;
    location: Location;
};
export declare function isAmsMathTextCommand(node: Node | undefined): node is AmsMathTextCommand;
export declare type DefCommand = {
    kind: 'command.def';
    name: 'def';
    token: string;
    args: (OptionalArg | CommandParameter | Group)[];
    location: Location;
};
export declare function isDefCommand(node: Node | undefined): node is DefCommand;
export declare type UrlCommand = {
    kind: 'command.url';
    name: 'url';
    url: string;
    location: Location;
};
export declare function isUrlCommand(node: Node | undefined): node is UrlCommand;
export declare type HrefCommand = {
    kind: 'command.href';
    name: 'href';
    url: string;
    arg: OptionalArg | undefined;
    content: Node[];
    location: Location;
};
export declare function isHrefCommand(node: Node | undefined): node is HrefCommand;
export declare type LabelCommand = {
    kind: 'command.label';
    name: 'label' | 'ref' | 'eqref' | 'autoref';
    label: string;
    location: Location;
};
export declare function isLabelCommand(node: Node | undefined): node is LabelCommand;
export declare type Environment = {
    kind: 'env';
    name: string;
    args: (OptionalArg | Group)[];
    content: Node[];
    location: Location;
};
export declare function isEnvironment(node: Node | undefined): node is Environment;
export declare type MathEnv = {
    kind: 'env.math.align';
    name: string;
    args: (OptionalArg | Group)[];
    content: Node[];
    location: Location;
};
export declare function isMathEnv(node: Node | undefined): node is MathEnv;
export declare type MathEnvAligned = {
    kind: 'env.math.aligned';
    name: string;
    args: (OptionalArg | Group)[];
    content: Node[];
    location: Location;
};
export declare function isMathEnvAligned(node: Node | undefined): node is MathEnvAligned;
export declare type Group = {
    kind: 'arg.group';
    content: Node[];
    location: Location;
};
export declare function isGroup(node: Node | undefined): node is Group;
export declare type OptionalArg = {
    kind: 'arg.optional';
    content: Node[];
    location: Location;
};
export declare function isOptionalArg(node: Node | undefined): node is OptionalArg;
export declare type Parbreak = {
    kind: 'parbreak';
    location: Location;
};
export declare function isParbreak(node: Node | undefined): node is Parbreak;
export declare type Space = {
    kind: 'space';
    location: undefined;
};
export declare function isSpace(node: Node | undefined): node is Space;
export declare type Softbreak = {
    kind: 'softbreak';
    location: undefined;
};
export declare function isSoftbreak(node: Node | undefined): node is Softbreak;
export declare type Linebreak = {
    kind: 'linebreak';
    name: '\\' | '\\*' | 'newline' | 'newline*' | 'linebreak';
    arg: OptionalArg | undefined;
    location: Location;
};
export declare function isLinebreak(node: Node | undefined): node is Linebreak;
export declare type Superscript = {
    kind: 'superscript';
    arg: Node | undefined;
    location: Location;
};
export declare function isSuperscript(node: Node | undefined): node is Superscript;
export declare type Subscript = {
    kind: 'subscript';
    arg: Node | undefined;
    location: Location;
};
export declare function isSubscript(node: Node | undefined): node is Subscript;
export declare type AlignmentTab = {
    kind: 'alignmentTab';
    location: Location;
};
export declare function isAlignmentTab(node: Node | undefined): node is AlignmentTab;
export declare type CommandParameter = {
    kind: 'commandParameter';
    nargs: string;
    location: Location;
};
export declare function isCommandParameter(node: Node | undefined): node is CommandParameter;
export declare type ActiveCharacter = {
    kind: 'activeCharacter';
    location: Location;
};
export declare function isActiveCharacter(node: Node | undefined): node is ActiveCharacter;
export declare type Ignore = {
    kind: 'ignore';
    location: Location;
};
export declare function isIgnore(node: Node | undefined): node is Ignore;
export declare type Verb = {
    kind: 'verb';
    name: string;
    escape: string;
    content: string;
    location: Location;
};
export declare function isVerb(node: Node | undefined): node is Verb;
export declare type Verbatim = {
    kind: 'env.verbatim';
    name: string;
    content: string;
    location: Location;
};
export declare function isVerbatim(node: Node | undefined): node is Verbatim;
export declare type Minted = {
    kind: 'env.minted';
    name: 'minted';
    args: (OptionalArg | Group)[];
    content: string;
    location: Location;
};
export declare function isMinted(node: Node | undefined): node is Minted;
export declare type Lstlisting = {
    kind: 'env.lstlisting';
    name: 'lstlisting';
    arg?: OptionalArg;
    content: string;
    location: Location;
};
export declare function isLstlisting(node: Node | undefined): node is Lstlisting;
export declare type InlienMath = {
    kind: 'inlineMath';
    content: Node[];
    location: Location;
};
export declare function isInlienMath(node: Node | undefined): node is InlienMath;
export declare type DisplayMath = {
    kind: 'displayMath';
    content: Node[];
    location: Location;
};
export declare function isDisplayMath(node: Node | undefined): node is DisplayMath;
export declare type MathCharacter = {
    kind: 'math.character';
    content: string;
    location: Location | undefined;
};
export declare function isMathCharacter(node: Node | undefined): node is MathCharacter;
export declare type MatchingDelimiters = {
    kind: 'math.matching_delimiters';
    left: string;
    right: string;
    content: Node[];
    location: Location;
};
export declare function isMatchingDelimiters(node: Node | undefined): node is MatchingDelimiters;
export declare type MathDelimiters = {
    kind: 'math.math_delimiters';
    lcommand: string;
    rcommand: string;
    left: string;
    right: string;
    content: Node[];
    location: Location;
};
export declare function isMathDelimiters(node: Node | undefined): node is MathDelimiters;
export declare function hasContent(node: Node | undefined): node is Extract<Node, {
    content: any;
}>;
export declare function hasContentArray(node: Node | undefined): node is Extract<Node, {
    content: Node[];
}>;
export declare function hasArgsArray(node: Node | undefined): node is Extract<Node, {
    args: Node[];
}>;
/**
 * The union type of all the node types of LaTeX AST.
 */
export declare type Node = TextString | Command | AmsMathTextCommand | DefCommand | UrlCommand | HrefCommand | LabelCommand | Environment | Group | OptionalArg | InlienMath | DisplayMath | MathCharacter | MatchingDelimiters | MathDelimiters | MathEnv | MathEnvAligned | Parbreak | Space | Softbreak | Linebreak | Superscript | Subscript | AlignmentTab | CommandParameter | ActiveCharacter | Ignore | Verb | Verbatim | Minted | Lstlisting;
export declare type Element = Exclude<Node, Space | Softbreak>;
export declare function isElement(node: Node): node is Element;
export declare type Comment = {
    kind: 'comment';
    content: string;
    location: Location;
};
export declare type AstRoot = {
    kind: 'ast.root';
    /** Nodes of the parsed document. */
    content: Node[];
    /** Comments in the document. */
    comment?: Comment[];
};
export declare function isAstRoot(ast: LatexAst): ast is AstRoot;
export declare type AstPreamble = {
    kind: 'ast.preamble';
    /** Nodes of the parsed preamble. */
    content: Node[];
    /** Comments in the document. */
    comment?: Comment[];
    /** The rest of the document after the preamble. */
    rest: string;
};
export declare function isAstPreamble(ast: LatexAst): ast is AstPreamble;
export declare type LatexAst = AstRoot | AstPreamble;
