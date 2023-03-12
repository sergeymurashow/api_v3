"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var counter_1 = __importDefault(require("./counter"));
function fixVoyageNumber(voyageNumberString) {
    // let regVoyage = /(?<=[\s\/])[iI].*[a-zA-Z0-9]+/gm
    var regVoyage = /([iI]\d+[a-zA-Z0-9]+|INT\d*\w*)/;
    var regNumber = /(\d+)/;
    var voyageNum;
    try {
        voyageNum = voyageNumberString.match(regVoyage)[0];
    }
    catch (e) {
        throw "Couldn't parse Voyage number: ".concat(voyageNumberString);
    }
    var newVoyageNum = voyageNum.replace(regNumber, function (match, p1) {
        var templater = new counter_1.default(2, p1);
        return templater.getNumber();
    });
    return newVoyageNum;
}
exports.default = fixVoyageNumber;
// let t = fixVoyageNumber('XIN LONG YUN 55I07N55')
//# sourceMappingURL=fixVoyageNumber.js.map