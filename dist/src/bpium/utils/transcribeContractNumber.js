"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transcribeContractNumber(contractNumber) {
    var contractTypes = {
        'transit': '00-INL-00-0000'
    };
    var reg = /(\d+)/g;
    var digitsFromContractNumber = contractNumber.match(reg);
    if (digitsFromContractNumber.length < 3) {
        throw new Error('Wrong contract number');
    }
    return replacer(digitsFromContractNumber);
}
exports.default = transcribeContractNumber;
function replacer(arr) {
    return "".concat(arr[0], "-INL-").concat(arr.slice(1).join('-'));
}
// let t = transcribeContractNumber( '05 InL-78-1-2022' )
// let t = transcribeContractNumber( 'Tetra' )
// console.log( t )
//# sourceMappingURL=transcribeContractNumber.js.map