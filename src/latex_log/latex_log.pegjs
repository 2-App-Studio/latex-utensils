Root
  // normal or -interaction=nonstopmode
  = x:(LogTextOutsideFileStack FileStack LogTextOutsideFileStack)
  {
      return { kind: 'full', content: x };
  }
  // -halt-on-error
  / x:(LogTextOutsideFileStackRightOpen FileStackRightOpen)
  {
      return { kind: 'halt_on_error', content: x };
  }
  // unknown
  / x:(LogTextOutsideFileStack FileStack)+
  {
      return { kind: 'unknown', content: x };
  }

FileStack
  = '(' path:Path ')' &(')' / Delimiter) __
  {
      return { kind: 'file_stack', path, content: [] };
  }
  / '(' path:Path Delimiter+ content:FileStackElement+ ')' __
  {
      return { kind: 'file_stack', path, content };
  }

FileStackRightOpen
  = '(' path:Path  Delimiter+ content:FileStackElement+
  {
    return { kind: 'file_stack', path, content };
  }

FileStackRightOpenElement
  = FileStack
  / FileStackRightOpen
  / PageNumber
  / LogText

LogTextOutsideFileStackRightOpen
  = x:$((!FileStackRightOpen .)+)
  {  
      return { kind: 'text_string', content:x };
  }

FileStackElement
  = FileStack 
  / PageNumber
  / TexError
  / LatexmkError
  / LogText

TexError
  = LineBreak '!' skip_space body:TexErrorBody __
  {
      return { kind: 'tex_error', message: body.message, line: body.line, command: body.command };
  }

LatexmkError
  = LineBreak head:LatexmkErrorPrefix skip_space body:TexErrorBody __
  {
      return { kind: 'latexmk_error', message: body.message, path: head.path, line: head.line, command: body.command };
  }

LatexmkErrorPrefix
  = path:$(PathPrefix (!(':' [0-9]+ ': ') .)+) ':' line:$([0-9]+) ':'
  {
    return { path, line: Number(line) };
  }

TexErrorBody
  = message:$(TexErrorChar+)
    LineBreak 'l.' line:$([0-9]+) skip_space command:$(( !LineBreak . )*)
  {
      return { message, line: Number(line), command: command || undefined };
  }

TexErrorChar
  = ( !( LineBreak 'l.' [0-9]+ ) . )

PageNumber
  = '[' page:$([0-9]+) __ content:$([^\]]*) ']' __
  {
      return { kind: 'page_number', page: Number(page), content: content || undefined };
  }

PageNumberChar
  = !']' .
  / ']' & ' ['

LogTextOutsideFileStack
  = x:$((!FileStack .)+)
  {  
      return { kind: 'text_string', content:x };
  }

LogText
  = x:$(LogTextElement+)
  {
      return { kind: 'text_string', content:x };
  }

LogTextElement
  = !FileStack ParenthesisString
  / !FileStack !TexError !LatexmkError !PageNumber [^()]

ParenthesisString
  = '(' LogTextElement+ ')'

Path
  = $( PathPrefix PathChar+ )
  / MiktexPath

PathPrefix = '.' / '/' / [a-zA-Z] ':' / '\\\\'

PathChar
  = !PathEnd .

// workaround to allow spaces in path
PathEnd
  = LineBreak
  / skip_space '(' Path
  / ')'+ skip_space '(' Path
  /  ( Space / ')' )+ LineBreak
  /*  for lualatex  */
  / '(' __ 'l' __ 'o' __ 'a' __ 'd' __ 'l' __ 'u' __ 'c' __ ':'
  / '(' __ 'u' __ 's' __ 'i' __ 'n' __ 'g' __ 'r' __ 'e' __ 'a' __ 'd' __ 'c' __ 'a' __ 'c' __ 'h' __ 'e' __ ':'

// quoted string is used by MikTeX as path string
MiktexPath
  = '"' x:$(( '\\"' / [^"] )+) '"'
  {
    return x;
  }

Char = !Delimiter .

LineBreak = '\r\n' / '\n'

Space = [ \t]

Delimiter = Space / LineBreak

skip_space = Space*

__ = ( Space / !TexError !LatexmkError LineBreak )*
