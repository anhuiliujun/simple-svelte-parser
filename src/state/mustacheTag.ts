import { Parser } from '../index';
import { Element, MustacheTag } from '../interface'
import { Node } from 'estree'
import { readExpression } from '../read/index'

export function mustacheTag(parser: Parser) {
  // 跳过 {
  parser.index++;

  parser.allowWhitespace;
  const expr: Node = readExpression(parser);
  parser.allowWhitespace();
  // 必须有}闭合标签
  parser.eat('}', true);
  const node: MustacheTag = {
    type: 'MustacheTag',
    expression: expr,
  };
  (parser.current() as Element).children.push(node);
}