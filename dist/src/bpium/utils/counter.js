"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberTemplater = void 0;
function numberTemplater(positions, num) {
    var template = '';
    for (var i = 0; i < positions; ++i) {
        template += '0';
    }
    var templated = "".concat(template).concat(num.toString());
    return templated;
}
exports.numberTemplater = numberTemplater;
var Counter = /** @class */ (function () {
    function Counter(positions, count) {
        if (positions === void 0) { positions = 3; }
        if (count === void 0) { count = 1; }
        this.count = count;
        this.positions = positions - this.count.toString().length;
    }
    Counter.prototype.getNumber = function () {
        var result = numberTemplater(this.positions, this.count);
        ++this.count;
        return result;
    };
    return Counter;
}());
exports.default = Counter;
//# sourceMappingURL=counter.js.map