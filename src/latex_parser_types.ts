export type TextString = {
    kind: "text.string";
    content: string;
    location: Location;
}

export function isTextString(node: Node) : node is TextString {
    return node.kind === 'text.string'
}

export type Command = {
    kind: "command";
    name: string;
    args: (OptionalArg | Group)[];
    location: Location;
}

export function isCommand(node: Node) : node is Command {
    return node.kind === 'command'
}

export type AmsMathTextCommand = {
    kind: "command.text";
    arg: Group;
    location: Location;
}

export function isAmsMathTextCommand(node: Node) : node is AmsMathTextCommand {
    return node.kind === 'command.text'
}

export type Environment = {
    kind: "env";
    name: string;
    args: (OptionalArg | Group)[];
    content: Node[];
    location: Location;
}

export function isEnvironment(node: Node) : node is Environment {
    return node.kind === 'env'
}

export type MathEnv = {
    kind: "env.math.align";
    name: string;
    content: Node[];
    location: Location;
}

export function isMathEnv(node: Node) : node is MathEnv {
    return node.kind === 'env.math.align'
}

export type MathEnvAligned = {
    kind: "env.math.aligned";
    name: string;
    content: Node[];
    location: Location;
}

export function isMathEnvAligned(node: Node) : node is MathEnvAligned {
    return node.kind === 'env.math.aligned'
}

export type Group = {
    kind: "arg.group";
    content: Node[];
    location: Location;
}

export function isGroup(node: Node) : node is Group {
    return node.kind === 'arg.group'
}

export type OptionalArg = {
    kind: "arg.optional";
    content: Node[];
    location: Location;
}

export function isOptionalArg(node: Node) : node is OptionalArg {
    return node.kind === 'arg.optional'
}

export type Pagebreak = {
    kind: "parbreak";
    location: Location;
}

export function isPagebreak(node: Node) : node is Pagebreak {
    return node.kind === 'parbreak'
}

export type Supescript = {
    kind: "superscript";
    content: Node[];
    location: Location;
}

export function isSupescript(node: Node) : node is Subscript {
    return node.kind === 'superscript'
}

export type Subscript = {
    kind: "subscript";
    content: Node[];
    location: Location;
}

export function isSubscript(node: Node) : node is Subscript {
    return node.kind === 'subscript'
}

export type Verb = {
    kind: "verb";
    escape: string;
    content: string;
    location: Location;
}

export function isVerb(node: Node) : node is Verb {
    return node.kind === 'verb'
}

export type Verbatim = {
    kind: "env.verbatim";
    content: string;
    location: Location;
}

export function isVerbatim(node: Node) : node is Verbatim {
    return node.kind === 'env.verbatim'
}

export type Minted = {
    kind: "env.minted";
    args: (OptionalArg | Group)[];
    content: string;
    location: Location;
}

export function isMinted(node: Node) : node is Minted {
    return node.kind === 'env.minted'
}

export type InlienMath = {
    kind: "math.inline";
    content: Node[];
    location: Location;
}

export function isInlienMath(node: Node) : node is InlienMath {
    return node.kind === 'math.inline'
}

export type DisplayMath = {
    kind: "math.display";
    content: Node[];
    location: Location;
}

export function isDisplayMath(node: Node) : node is DisplayMath {
    return node.kind === 'math.display'
}

export type Node
= TextString
| Command
| AmsMathTextCommand
| Environment
| Group
| OptionalArg
| InlienMath
| DisplayMath
| MathEnv
| MathEnvAligned
| Pagebreak
| Supescript
| Subscript
| Verb
| Verbatim
| Minted

export type Location = {
    start: { 
        offset: number;
        line: number;
        column: number;
    };
    end: {
        offset: number;
        line: number;
        column: number;
    };
}

export type Comment = {
    kind: "comment";
    content: string;
    location: Location;
}

export type AstRoot = {
    kind: 'ast.root';
    content: Node[];
    comment?: Comment[];
}

export type AstPreamble = {
    kind: 'ast.preamble';
    content: Node[];
    comment?: Comment[];
}

export type LatexAst = AstRoot | AstPreamble

export type ParserOptions = {
    startRule?: string;
    tracer?: Tracer;
    enableComment?: boolean;
}

export type TraceArg = {
    type: "rule.enter" | "rule.match" | "rule.fail";
    rule: string;
    result: string | Node;
    location: Location;
}

export type Tracer = {
    trace: (e: TraceArg) => any;
}
