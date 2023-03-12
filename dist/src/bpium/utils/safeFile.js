"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeFile = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var createCatalogs_1 = __importDefault(require("./createCatalogs"));
var fn = path_1.default.resolve('files', 'test.txt');
function safeFile(filePath, body) {
    var fPath = path_1.default.dirname(filePath);
    (0, createCatalogs_1.default)(fPath);
    fs_1.default.writeFileSync(filePath, body);
    return;
}
exports.safeFile = safeFile;
//# sourceMappingURL=safeFile.js.map