"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bpiumRouter_1 = require("./routes/bpiumRouter");
var oneCRouter_1 = require("./routes/oneCRouter");
var GetConfig_1 = __importDefault(require("./GetConfig"));
var port = GetConfig_1.default.port;
var configMessage = function () {
    var arr = [];
    for (var i in GetConfig_1.default) {
        arr.push("".concat(i, ": ").concat(GetConfig_1.default[i]));
    }
    return arr.join('\n');
};
var app = (0, express_1.default)();
app.use('/api/bpium', bpiumRouter_1.bpiumRouter);
app.use('/api/1c', oneCRouter_1.oneCRouter);
var startMessage = "Running with params:\n".concat(configMessage(), "\n");
app.listen(port, function () { return console.log(startMessage); });
//# sourceMappingURL=index.js.map