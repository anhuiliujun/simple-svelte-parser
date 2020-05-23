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

export interface Attribute {
  name: string;
  type: string;
  value: any;
}

export type TemplateNode = Element | Fragment | Text | BaseTemplateNode;

