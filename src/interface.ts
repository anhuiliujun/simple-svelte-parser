import { Node, Expression } from 'estree'

interface BaseTemplateNode {
  type: string;
  children?: TemplateNode[];
  [prop_name: string]: any;
}

export interface Text extends BaseTemplateNode {
  type: 'Text';
  data: string;
}

export interface Fragment extends BaseTemplateNode {
  type: 'Fragment';
  children: TemplateNode[];
}

export interface Element extends BaseTemplateNode {
  type: 'Element';
  name: string;
  attributes: Attribute[];
  children: TemplateNode[];
}

export interface MustacheTag extends BaseTemplateNode {
  type: 'MustacheTag',
  expression: Node,
}

export interface Attribute {
  name: string;
  type: string;
  value: any;
}

export type TemplateNode = Element | MustacheTag | Fragment | Text | BaseTemplateNode;

