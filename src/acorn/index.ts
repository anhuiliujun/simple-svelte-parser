import * as acorn from 'acorn';

export const parseExpressionAt = (source: string, index: number) => acorn.parseExpressionAt(source, index, {
  ecmaVersion: 11,
	locations: true,
});