import { parse as svelteParse } from 'svelte/compiler';
import { parse as p } from '../src/index'


function transform(node) {
  delete node.start;
  delete node.end;
  delete node.loc;
  for (const key of Object.keys(node)) {
    if (typeof node[key] === 'object') {
      if (Array.isArray(node[key])) {
        for (const child of node[key]) {
          transform(child);
        }
      } else {
        transform(node[key]);
      }
    }
  }
}

export function svelteParse4html(input: string) {
  const { html } = svelteParse(input)
  transform(html);
  return html;
}

export function parse(input: string) {
  const node = p(input)
  transform(node);
  return node;
}