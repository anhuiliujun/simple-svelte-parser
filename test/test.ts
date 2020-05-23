import { parse } from '../src/index';
import * as assert from 'assert';

describe('parse', () => {
  it('simple works', () => {
    const input = `
  <h1>title</h1>
  `.trim()

  const ast = parse(input);

  assert.deepEqual(ast, {
    type: 'Fragment',
    children: [
      {
        type: 'Element',
        name: 'h1',
        attributes: [],
        children: [
          {
            type: 'Text',
            data: 'title',
          }
        ]
      }
    ]
  })
  })
  
})