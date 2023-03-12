"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsCollector = void 0;
var ErrorsCollector = /** @class */ (function (_super) {
    __extends(ErrorsCollector, _super);
    function ErrorsCollector(message) {
        var _this = _super.call(this, message) || this;
        _this.errCollection = [];
        _this.errLog = function (data) {
            var dataString = JSON.stringify(data, null, 1);
            _this.errCollection.push(dataString);
        };
        _this.getErrors = function () {
            return _this.errCollection;
        };
        return _this;
    }
    return ErrorsCollector;
}(Error));
exports.ErrorsCollector = ErrorsCollector;
//# sourceMappingURL=ErrorCollector.js.map