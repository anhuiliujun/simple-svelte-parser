import { parse } from 'svelte/compiler';


function transform(node) {
  delete node.start;
  delete node.end;
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
  const { html } = parse(input)
  transform(html);
  return html;
}