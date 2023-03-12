"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var samples_1 = __importDefault(require("./samples"));
function clearCell(cell) {
    return cell.replace(/[^a-zA-Z\d]/g, '');
}
var FindTableTitle = /** @class */ (function () {
    function FindTableTitle(tableArray, docType) {
        this.tableArray = tableArray;
        this.docType = docType;
        this.dataCollector = {};
    }
    FindTableTitle.prototype.findString = function () {
        var _this = this;
        var documentSample = samples_1.default.getWithAliases(this.docType);
        var raperCell = documentSample[0];
        var tableHeader = this.tableArray.find(function (str, index, array) {
            for (var i in str) {
                var cell = clearCell(str[i].toString()).toUpperCase();
                if (cell === raperCell.alias) {
                    _this.dataCollector.startIndex = index;
                    return str;
                }
            }
        });
        for (var i in tableHeader) {
            tableHeader[i] = clearCell(tableHeader[i].toString()).toUpperCase();
        }
        Object.assign(this.dataCollector, { tableHeader: tableHeader });
        return this;
    };
    FindTableTitle.prototype.makeTemplate = function () {
        var _this = this;
        var sample = samples_1.default.getWithAliases(this.docType);
        var template = (function () {
            var renamedObject = {};
            var _loop_1 = function (i) {
                var oldCellName = _this.dataCollector.tableHeader[i];
                var foundSample = sample.find(function (fi) {
                    return fi.alias == oldCellName;
                });
                if (foundSample) {
                    foundSample.cellName = "".concat(foundSample.cellName, "_checked");
                    renamedObject[i] = foundSample.alias;
                }
            };
            for (var i in _this.dataCollector.tableHeader) {
                _loop_1(i);
            }
            _this.dataCollector.headerTemplate = renamedObject;
            return _this;
        })();
        return template;
    };
    FindTableTitle.prototype.renameColumns = function () {
        var _this = this;
        function giver(data) {
            return data;
        }
        var headersPreset = (function () {
            var _a;
            var tmp = {};
            var headers = _this.dataCollector.headerTemplate;
            for (var i in headers) {
                Object.assign(tmp, (_a = {}, _a[headers[i]] = null, _a));
            }
            return tmp;
        })();
        var collector = [];
        this.tableArray.forEach(function (fo) {
            var forEachCollector = {};
            for (var i in fo) {
                if (fo[i]) {
                    var newName = _this.dataCollector.headerTemplate[i];
                    var keyName = forEachCollector[newName] ? "".concat(newName, "_2") : newName;
                    forEachCollector[keyName] = fo[i];
                }
            }
            collector.push(Object.assign({}, headersPreset, forEachCollector));
        });
        this.dataCollector.renamedTable = collector;
        var resp;
        switch (this.docType) {
            case 'manifest':
                resp = giver(collector);
                break;
            case 'contract':
                resp = giver(collector);
                break;
        }
        return resp;
    };
    FindTableTitle.prototype.getTable = function () {
        this.findString();
        this.makeTemplate();
        this.renameColumns();
        return { table: this.dataCollector.renamedTable, startIndex: this.dataCollector.startIndex };
    };
    return FindTableTitle;
}());
exports.default = FindTableTitle;
// let file = Path.resolve('src', 'DocsParse', 'testData', 'MANIFEST-01.xls')
// let parser = new DocumentParser(file)
// let sheet = parser.bigSheet
// let test = new FindTableTitle(sheet, 'manifest').getTable()
//# sourceMappingURL=FindTableTitle.js.map