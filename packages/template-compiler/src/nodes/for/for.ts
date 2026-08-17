import { Visitor } from "../../visitors/visitor/visitor";
import { astNode } from "../astNode/astNode";
import { Interpolation } from "../interpolation/interpolation";

export class For extends astNode{

    constructor(
        public itemVar:string,
        public indexVar:string | null,
        public source:Interpolation,
        public keyFn:Interpolation | null,
        public body:astNode[]
    ){
        super();
    }

    acceptVisitor(visitor:Visitor){
        return visitor.visitFor(this);
    }
}
