import * as assert from 'assert';
import { svelteParse4html, parse } from './helper';

describe('parse', () => {
  it('simple works', () => {
    const input = `
  <h1>title</h1>
  `;

    const ast = parse(input);
    const expected = svelteParse4html(input);
    assert.deepEqual(ast, expected);
    assert.deepEqual(ast, {
      type: 'Fragment',
      children: [
        {
          data: '\n  ',
          raw: '\n  ',
          type: 'Text',
        },
        {
          type: 'Element',
          name: 'h1',
          attributes: [],
          children: [
            {
              type: 'Text',
              raw: 'title',
              data: 'title',
            },
          ],
        },
      ],
    });
  });

  it('support attributes', () => {
    const input = `
    <div class="container">
      <h1>title</h1>
      <span>test nested</span>
    </div>
    <input type=text name="x"/>
    `;
    const ast = parse(input);
    const expected = svelteParse4html(input);
    assert.deepEqual(ast, expected);
    assert.deepEqual(ast, {
      type: 'Fragment',
      children: [
        {
          type: 'Text',
          data: '\n    ',
          raw: '\n    ',
        },
        {
          type: 'Element',
          name: 'div',
          attributes: [
            {
              type: 'Attribute',
              name: 'class',
              value: [
                {
                  type: 'Text',
                  data: 'container',
                  raw: 'container',
                },
              ],
            },
          ],
          children: [
            {
              type: 'Text',
              data: '\n      ',
              raw: '\n      ',
            },
            {
              type: 'Element',
              name: 'h1',
              attributes: [],
              children: [
                {
                  type: 'Text',
                  data: 'title',
                  raw: 'title',
                },
              ],
            },
            {
              type: 'Text',
              data: '\n      ',
              raw: '\n      ',
            },
            {
              type: 'Element',
              name: 'span',
              attributes: [],
              children: [
                {
                  type: 'Text',
                  data: 'test nested',
                  raw: 'test nested',
                },
              ],
            },
            {
              type: 'Text',
              data: '\n    ',
              raw: '\n    ',
            },
          ],
        },
        {
          type: 'Text',
          data: '\n    ',
          raw: '\n    ',
        },
        {
          type: 'Element',
          name: 'input',
          attributes: [
            {
              type: 'Attribute',
              name: 'type',
              value: [
                {
                  type: 'Text',
                  data: 'text',
                  raw: 'text',
                },
              ],
            },
            {
              type: 'Attribute',
              name: 'name',
              value: [
                {
                  type: 'Text',
                  data: 'x',
                  raw: 'x',
                },
              ],
            },
          ],
          children: [],
        },
      ],
    });
  });

  it('whitespace', () => {
    const input = `
    <div
      class="container"
      style="color: red;"
    >
    </div>
    
    `;
    const expected = svelteParse4html(input);
    const actual = parse(input);
    assert.deepEqual(actual, expected);
    assert.deepEqual(actual, {
      type: 'Fragment',
      children: [
        {
          type: 'Text',
          data: '\n    ',
          raw: '\n    ',
        },
        {
          type: 'Element',
          name: 'div',
          attributes: [
            {
              type: 'Attribute',
              name: 'class',
              value: [
                {
                  type: 'Text',
                  data: 'container',
                  raw: 'container',
                },
              ],
            },
            {
              type: 'Attribute',
              name: 'style',
              value: [
                {
                  type: 'Text',
                  data: 'color: red;',
                  raw: 'color: red;',
                },
              ],
            },
          ],
          children: [
            {
              type: 'Text',
              data: '\n    ',
              raw: '\n    ',
            },
          ],
        },
      ],
    });
  });

  it('support {}', () => {
    const input = `
    <h1>hello {world}</h1>
    `
    const expected = svelteParse4html(input);
    const actual = parse(input);
    assert.deepEqual(actual, expected);
  });
});
