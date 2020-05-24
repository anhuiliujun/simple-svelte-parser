import { parse } from 'svelte/compiler';


function transform(node) {
  delete node.start;
  delete node.end;
  if (node.children) {
    for (const child of node.children) {
      transform(child);
    }
  }
}

export function svelteParse4html(input: string) {
  const { html } = parse(input)
  transform(html);
  return html;
}