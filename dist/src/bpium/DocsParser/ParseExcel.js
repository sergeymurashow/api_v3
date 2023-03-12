"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//*
//* Indoor files
var ManifestParser_1 = __importDefault(require("./ManifestParser"));
var ReportParser_1 = __importDefault(require("./ReportParser"));
//*
var ParseExcel = /** @class */ (function () {
    function ParseExcel(fileName, docType) {
        this.fileName = fileName;
        this.docType = docType;
    }
    ParseExcel.prototype.get = function () {
        var _this = this;
        switch (this.docType) {
            case 'manifest':
                return new ManifestParser_1.default(this.fileName).parsed.map(function (m) { return Object.assign(m, { fileName: _this.fileName }); });
                break;
            case 'contract':
                return new ReportParser_1.default(this.fileName).parsed.map(function (m) { return Object.assign(m, { fileName: _this.fileName }); });
                break;
        }
    };
    return ParseExcel;
}());
exports.default = ParseExcel;
//# sourceMappingURL=ParseExcel.js.map