"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlAttribute = exports.ATTRIBUTE_TYPE = void 0;
const astNode_1 = require("../astNode/astNode");
var ATTRIBUTE_TYPE;
(function (ATTRIBUTE_TYPE) {
    ATTRIBUTE_TYPE[ATTRIBUTE_TYPE["VALUE"] = 0] = "VALUE";
    ATTRIBUTE_TYPE[ATTRIBUTE_TYPE["REF"] = 1] = "REF";
    ATTRIBUTE_TYPE[ATTRIBUTE_TYPE["EVENT_HANDLER"] = 2] = "EVENT_HANDLER";
    ATTRIBUTE_TYPE[ATTRIBUTE_TYPE["PROP"] = 3] = "PROP";
})(ATTRIBUTE_TYPE || (exports.ATTRIBUTE_TYPE = ATTRIBUTE_TYPE = {}));
class HtmlAttribute extends astNode_1.astNode {
    constructor(attributeName, attributeValue, attributeType = ATTRIBUTE_TYPE.VALUE) {
        super();
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
        this.attributeType = attributeType;
    }
    acceptVisitor(visitor) {
        return visitor.visitHtmlAttribute(this);
    }
}
exports.HtmlAttribute = HtmlAttribute;
