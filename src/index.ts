import { TemplateNode, Fragment } from './interface'
import { fragment } from './state/index'

type ParserState = (parser: Parser) => ParserState | void;

export class Parser {
  public source: string;
  public index: number;
  public stack: TemplateNode[] = [];
  constructor(source: string) {
    this.source = source.replace(/\s+$/,'');
    this.index = 0;
    const root: Fragment = {
      type: 'Fragment',
      children: [],
    }
    this.stack.push(root);
  }

  public parse(): TemplateNode {
    let state: ParserState = fragment;
    while (this.index < this.source.length) {
      state = state(this) || fragment;
    }
    
    if (this.stack.length > 1) {
      const current = this.current();
      throw new Error(`parser error: unclosed tag ${current.name}`);
    }
    if (state !== fragment) {
      throw new Error('parser error: unexpected eof!');
    }
    return this.current();
  }

  public match(str: string) {
    return str === this.source.slice(this.index, this.index + str.length);
  }

  public matchRegex(regex: RegExp) {
    const match = regex.exec(this.source.slice(this.index));
		if (!match || match.index !== 0) return null;

		return match[0];
  }

  public current(): TemplateNode {
    return this.stack[this.stack.length - 1];
  }

  public eat(str: string, required?: boolean) {
    if (this.match(str)) {
      this.index += str.length;
      return true;
    }
    if (required) {
      throw new Error(`Expected ${str}`);
    }
    return false
  }

  public readUntil(regex: RegExp) {
    const start = this.index;
    const match = regex.exec(this.source.slice(start))
    if (match) {
      this.index = start + match.index;
      return this.source.slice(start, this.index);
    }
    // 什么道理？没有读到，说明整个文本里都没有，把指针移动到最后吧
    this.index = this.source.length;
    return this.source.slice(start)
  }

  public allowWhitespace() {
    const whiteSpace = /[ \t\r\n]/;
    while (this.index < this.source.length && whiteSpace.test(this.source[this.index])) {
      this.index++;
    }
  }
}

export function parse(source: string): TemplateNode {
  const parser = new Parser(source);
  return parser.parse();
}