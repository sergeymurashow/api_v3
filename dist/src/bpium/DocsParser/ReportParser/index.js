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
var lodash_1 = __importDefault(require("lodash"));
var DocumentsParser_1 = __importDefault(require("../DocumentsParser"));
var FindTableTitle_1 = __importDefault(require("../FindTableTitle"));
var getBookingFromReport_1 = __importDefault(require("./getBookingFromReport"));
var ReportParser = /** @class */ (function (_super) {
    __extends(ReportParser, _super);
    function ReportParser(params) {
        var _this = _super.call(this, params) || this;
        var renamedTable = new FindTableTitle_1.default(_this.bigSheet, 'contract').getTable();
        _this.table = renamedTable.table;
        _this.startIndex = renamedTable.startIndex;
        return _this;
    }
    Object.defineProperty(ReportParser.prototype, "parsed", {
        get: function () {
            var collect = this.table
                .filter(function (f) {
                try {
                    return f.BOOKINGNO && f.BOOKINGNO.toString().match(/(INT|INJIAN)\d+/);
                }
                catch (e) {
                    console.error(e);
                    console.log(f);
                }
            })
                .map(function (m) {
                var parsedBooking;
                try {
                    parsedBooking = (0, getBookingFromReport_1.default)(m);
                }
                catch (e) {
                    console.error(e);
                    console.error(m);
                    parsedBooking = [{ bookingId: null }];
                }
                return parsedBooking;
            })
                .filter(function (f) {
                return f.bookingId;
            });
            return lodash_1.default.sortBy(collect, 'bookingId');
        },
        enumerable: false,
        configurable: true
    });
    return ReportParser;
}(DocumentsParser_1.default));
exports.default = ReportParser;
var test = new ReportParser('/Users/sergey.murashow/Codets/intecoJiangjie/api_v2/testData/fuckingTestReport.xlsx').parsed;
//# sourceMappingURL=index.js.map