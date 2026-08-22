"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTokens = printTokens;
exports.default = transform;
const src_1 = require("./src");
const parser_1 = require("./src/parser/parser");
const stringify_1 = require("./src/visitors/stringify/stringify");
function printTokens(source) {
    const lexer = new src_1.Lexer(source);
    let currentToken = lexer.getNextToken();
    while (currentToken.tokenType !== src_1.TOKEN_TYPE.END_OF_FILE) {
        console.log(currentToken);
        currentToken = lexer.getNextToken();
    }
}
function transform(source) {
    const lexer = new src_1.Lexer(source);
    const parser = new parser_1.Parser(lexer);
    const ast = parser.parse();
    // const codeGen = new CodeGenerator();
    // const res = codeGen.eval(ast);
    const stringify = new stringify_1.Stringify();
    const stringifiedRes = stringify.eval(ast);
    console.log(stringifiedRes);
    return "module.exports = " + stringifiedRes;
}
transform(`@if(a%2===0){
 @if(a%4===0){
  <h1>a {a + ' '} is even and divisible by 4 </h1>
 }
}`);
