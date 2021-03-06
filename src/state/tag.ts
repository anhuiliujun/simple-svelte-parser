import { Parser } from '../index';
import { Element, Attribute, Text, MustacheTag, TemplateNode } from '../interface'
import { Node } from 'estree'
import {readExpression} from '../read/index';

/**
 * <div> <div style="">
 * self closing tag: <div/> <div style="" />
 * closing tag: </div>
 */
function readTagName(parser: Parser) {
  return parser.readUntil(/\s|>|\//)
}

/**
 * <button style="color: red" class='xx' disabled>a</button>
 * <input disabled  style = "x"/>
 * <input disabled />
 */

function readAttribute(parser: Parser, names: Set<string>): Attribute | null {

  function checkUnique(name: string) {
    if (names.has(name)) {
      throw new Error(`duplicate attribute ${name}`);
    }
    names.add(name);
  }

  const name = parser.readUntil(/[\s=\/>]/);
  if (!name) {
    return null;
  }
  parser.allowWhitespace();
  let value: any = true;
  if (parser.eat('=')) {
    parser.allowWhitespace();
		value = readAttributeValue(parser);
  }

  checkUnique(name);

  return {
    type: 'Attribute',
    name,
    value,
  }
}

/**
 * <button style="color: red" class='xx' a=b c=d>a</button>
 * <input a=b/>
 */
function readAttributeValue(parser: Parser): TemplateNode[]  {
  
  const quoteMark = parser.eat(`'`) ? `'` : parser.eat(`"`) ? `"` : null;
  const regex = quoteMark === `'` ? /'/ : quoteMark === `"` ? /"/ : /[\s/>]/;
  let currentChunk: Text = {
    type: 'Text',
    data: '',
  }
  const chunks = [];

  function flush() {
    if (currentChunk.data.length) {
      currentChunk.raw = currentChunk.data;
      chunks.push(currentChunk);
    }
  }

  while (parser.index < parser.source.length) {
    // 读到属性结尾处
    if (parser.matchRegex(regex)) {
      flush();
      if (quoteMark) {
        parser.index += 1;
      }
      return chunks;
    } else if (parser.match('{')) {
      flush();
      parser.index++;
      parser.allowWhitespace();
      const expr: Node = readExpression(parser);
      parser.allowWhitespace();
      // 必须有}闭合标签
      parser.eat('}', true);
      const node: MustacheTag = {
        type: 'MustacheTag',
        expression: expr,
      };
      chunks.push(node);
      currentChunk = {
        type: 'Text',
        data: '',
      }
    } else {
      currentChunk.data += parser.source[parser.index++];
    }
  }
  throw new Error('Unexpected end of input');
}

export function tag(parser: Parser) {
  parser.eat('<');
  const isClosingTag = parser.eat('/');
  const tagName = readTagName(parser);
  const element: Element = {
    type: "Element",
    name: tagName,
    attributes: [],
    children: [],
  }

  parser.allowWhitespace();

  if (isClosingTag) {
    parser.eat('>', true);
    parser.stack.pop();
  } else {
    const unique_names: Set<string> = new Set();
    let attribute;
    while (attribute = readAttribute(parser, unique_names)) {
      element.attributes.push(attribute);
      parser.allowWhitespace();
    }
    (parser.current() as Element).children.push(element);

    // self closing tag
    const isSelfClosing = parser.eat('/');
    parser.eat('>');
    if (!isSelfClosing) {
      parser.stack.push(element);
    }
  }
}