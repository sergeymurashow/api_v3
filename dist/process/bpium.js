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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BpiumProcessRunner = void 0;
// Node JS
var path_1 = __importDefault(require("path"));
// Interfaces
var runner_1 = __importDefault(require("./runner"));
/**
 * @constructor
 * @typeDef
 * {@link Runner}
 * @params
 * {@link Params}
 * @desc Run Bpium processes
 */
var BpiumProcessRunner = /** @class */ (function (_super) {
    __extends(BpiumProcessRunner, _super);
    function BpiumProcessRunner(params) {
        var _this = _super.call(this) || this;
        _this.params = params;
        _this.workDir = path_1.default.resolve(_this.workDir, 'bpium');
        return _this;
    }
    return BpiumProcessRunner;
}(runner_1.default));
exports.BpiumProcessRunner = BpiumProcessRunner;
//# sourceMappingURL=bpium.js.map