"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentsParser_1 = __importDefault(require("../DocsParser/DocumentsParser"));
var transcribeContractNumber_1 = __importDefault(require("./transcribeContractNumber"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var filePath = path_1.default.resolve('files', 'ContractsList.xlsx');
var table = new DocumentsParser_1.default(filePath).bigSheet;
function clearString(data) {
    if (!data)
        return null;
    if (typeof data === 'number')
        return data.toString();
    try {
        if (!data)
            return;
        return data.replace(/(^\s+|\s+$)/g, '');
    }
    catch (err) {
        console.error(err);
    }
}
var Contract = /** @class */ (function () {
    function Contract(data) {
        this.date = data.date;
        this.name = data.name;
        this.number = data.number;
    }
    return Contract;
}());
var result = [];
table.forEach(function (fo) {
    if (fo.A) {
        var contractNo = void 0;
        var data = (function () {
            var tmp = fo.A.split(/от/);
            var number = tmp[0];
            var date = clearString(tmp[1]);
            return { number: number, date: date };
        })();
        try {
            contractNo = (0, transcribeContractNumber_1.default)(data.number).answer;
        }
        catch (e) {
            console.log(e);
        }
        if (contractNo) {
            result.push(["".concat(contractNo, " \u043E\u0442 ").concat(data.date), fo.B].join('\t'));
        }
    }
});
var ansPath = path_1.default.resolve('files', 'output.txt');
fs_1.default.writeFileSync(ansPath, result.join('\n'));
var t = 1;
var q;
//# sourceMappingURL=contractsParser.js.map