"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var lodash_1 = __importDefault(require("lodash"));
var index_1 = __importDefault(require("../utils/index"));
var DocumentsParser = /** @class */ (function () {
    function DocumentsParser(filePath) {
        var _this = this;
        this.fixVoyageNumber = index_1.default.fixVoyageNumber;
        var sheets = xlsx_1.default.readFile(filePath);
        this.testSheet = sheets;
        var sheet = {};
        sheets.Workbook.Sheets.forEach(function (fo) {
            if (!fo.Hidden)
                sheet[fo.name] = sheets.Sheets[fo.name];
        });
        var parsedSheet = lodash_1.default.toArray(sheet).map(function (m) { return _this.parseSheet(m); });
        this.bigSheet = [].concat.apply([], parsedSheet);
    }
    DocumentsParser.prototype.parseSheet = function (sheet) {
        var _a;
        var obj = {
            data: {},
            getAddr: function (key) {
                return {
                    col: key.match(/[A-Z]*/)[0],
                    row: key.match(/\d+/)[0]
                };
            },
            set: function (data) {
                var keys = this.getAddr(Object.keys(data)[0]);
                var value = Object.values(data)[0];
                if (!this.data[keys.row])
                    this.data[keys.row] = {};
                this.data[keys.row][keys.col] = value.w;
            },
            get: function () {
                return lodash_1.default.toArray(this.data);
            }
        };
        for (var i in sheet) {
            if (!i.includes('!')) {
                obj.set((_a = {}, _a[i] = sheet[i], _a));
            }
        }
        var arrayData = obj.get();
        return arrayData;
    };
    return DocumentsParser;
}());
exports.default = DocumentsParser;
//# sourceMappingURL=DocumentsParser.js.map