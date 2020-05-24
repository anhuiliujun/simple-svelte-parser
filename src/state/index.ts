import { Parser } from '../index'
import { tag } from './tag';
import { text } from './text';
import { mustacheTag } from './mustacheTag'

export function fragment(parser: Parser) {
  if (parser.match('<')) {
    return tag;
  }
  if (parser.match('{')) {
    return mustacheTag;
  }
  return text;
}
