import { Parser } from '../index'
import { tag } from './tag';
import { text } from './text';

export function fragment(parser: Parser) {
  if (parser.match('<')) {
    return tag;
  }
  return text;
}
