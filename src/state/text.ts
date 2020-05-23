import { Parser } from '../index';
import { Element, Text } from '../interface'

export function text(parser: Parser) {
  let data = '';
  while (
    parser.index < parser.source.length 
    && !parser.match('<') 
  ) {
    data = data + parser.source[parser.index];
    parser.index++;
  }
  const textNode: Text = {
    type: 'Text',
    data,
  };
  (parser.current() as Element).children.push(textNode)
}
