"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function answerTemplate(data) {
    var answer = data.answer, code = data.code, err = data.err;
    return { answer: answer, code: code, err: err };
}
exports.default = answerTemplate;
console.log(answerTemplate({ answer: 'test' }));
//# sourceMappingURL=answerTemplate.js.map