import { Parser } from '../index';
import { Node } from 'estree'
import { parseExpressionAt } from '../acorn/index'

export function readExpression(parser: Parser): Node {
  const expr = parseExpressionAt(parser.source, parser.index);
  parser.index = expr.end;
  return expr as Node;
}