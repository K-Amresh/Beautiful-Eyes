import { Interpolation } from "../interpolation/interpolation";
import { StringNode } from "../string/string";
import {HtmlElement} from '../HtmlElement/HtmlElement';
import { IfElse } from "../ifElse/ifElse";
import { For } from "../for/for";

export type HtmlChild = HtmlElement | Interpolation | StringNode | IfElse | For;
export type htmlChildren = HtmlChild[];