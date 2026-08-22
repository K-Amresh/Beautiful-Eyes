"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformer;
const ts = __importStar(require("typescript"));
function componentTransformer(context) {
    return (sourceFile) => {
        const visitor = (node) => {
            if (ts.isDecorator(node)) {
                const expression = node.expression;
                if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === 'Component') {
                    const args = expression.arguments;
                    if (args.length > 0 && ts.isObjectLiteralExpression(args[0])) {
                        const properties = args[0].properties;
                        properties.forEach((prop) => {
                            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                                const keyName = prop.name.text;
                                if (keyName === 'useTemplate' && ts.isStringLiteral(prop.initializer)) {
                                    const importCall = ts.factory.createCallExpression(ts.factory.createToken(ts.SyntaxKind.ImportKeyword), undefined, [prop.initializer]);
                                    prop.initializer = importCall;
                                }
                                if (keyName === 'useStyleSheets' && ts.isArrayLiteralExpression(prop.initializer)) {
                                    const elements = prop.initializer.elements.map((el) => {
                                        if (ts.isStringLiteral(el)) {
                                            return ts.factory.createCallExpression(ts.factory.createToken(ts.SyntaxKind.ImportKeyword), undefined, [el]);
                                        }
                                        return el;
                                    });
                                    prop.initializer = ts.factory.createArrayLiteralExpression(elements, false);
                                }
                            }
                        });
                    }
                }
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
    };
}
function transformer(program) {
    return (context) => (sourceFile) => componentTransformer(context)(sourceFile);
}
