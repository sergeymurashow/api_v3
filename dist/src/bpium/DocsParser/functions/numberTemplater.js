"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numberTemplater(positions, num) {
    var template = '';
    for (var i = 0; i < positions; ++i) {
        template += '0';
    }
    var templated = "".concat(template).concat(num.toString());
    return templated;
}
exports.default = numberTemplater;
//# sourceMappingURL=numberTemplater.js.map