export type Interpolation = Function;
export type AttributeValue = string | Interpolation;
export type AttributeObj = Record<string, AttributeValue>
export type EventHandlerObject = Record<string, Interpolation>;
export type RefObject = string;
export type IfElse = [Interpolation, BE_Node[]][];
export type BE_Node = string | HtmlObj | Interpolation | DirectiveObj;
export type BE_Nodes = BE_Node[];

export enum NODE_OBJ_TYPE {
    HTML_ELEMENT,
    DIRECTIVE
};

export type HtmlObj = {
    type: NODE_OBJ_TYPE.HTML_ELEMENT
    name:string, 
    attributes:AttributeObj,
    eventHandlers:EventHandlerObject,
    ref:RefObject,
    children:BE_Nodes
};

export type IfElseDirective = {
    type: NODE_OBJ_TYPE.DIRECTIVE,
    name: 'ifElse',
    children:IfElse
}

export type ForDirective = {
    type: NODE_OBJ_TYPE.DIRECTIVE,
    name: 'for',
    itemVar: string,
    indexVar: string | null,
    source: Interpolation,
    keyFn: Interpolation | null,
    body: BE_Nodes
}

export type DirectiveObj = IfElseDirective | ForDirective;

export type DependencyFn = (ctx:any) => any[];