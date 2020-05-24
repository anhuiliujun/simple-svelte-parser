import { parse } from '../src/index';
import * as assert from 'assert';
import { svelteParse4html } from './helper';

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
          type: 'Text'
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

  it.skip('support attributes', () => {
    const input = `
    <div class="container">
      <h1>title</h1>
      <span>test nested</span>
    </div>
    <input type=text name="x"/>
    `;
    const ast = parse(input);
    const expected = svelteParse4html(input);
   assert.deepEqual(ast, expected)
    // assert.deepEqual(ast, {
    //   type: 'Fragment',
    //   children: [
    //     {
    //       type: 'Element',
    //       name: 'div',
    //       attributes: [
    //         {
    //           type: 'Attribute',
    //           name: 'class',
    //           value: [
    //             {
    //               type: 'Text',
    //               data: 'container',
    //             },
    //           ],
    //         },
    //       ],
    //       children: [
    //         {
    //           type: 'Element',
    //           name: 'h1',
    //           attributes: [],
    //           children: [
    //             {
    //               type: 'Text',
    //               data: 'title',
    //             },
    //           ],
    //         },
    //         {
    //           type: 'Element',
    //           name: 'span',
    //           attributes: [],
    //           children: [
    //             {
    //               type: 'Text',
    //               data: 'test nested',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: 'Element',
    //       name: 'input',
    //       attributes: [
    //         {
    //           type: 'Attribute',
    //           name: 'type',
    //           value: [
    //             {
    //               type: 'Text',
    //               data: 'text',
    //             },
    //           ],
    //         },
    //         {
    //           type: 'Attribute',
    //           name: 'name',
    //           value: [
    //             {
    //               type: 'Text',
    //               data: 'x',
    //             },
    //           ],
    //         },
    //       ],
    //       children: [],
    //     },
    //   ],
    // });
  });
});
