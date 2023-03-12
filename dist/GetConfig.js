"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var configPath = process.env.CONFIG || '../config/config.env';
// const configPath = process.env.CONFIG || '../config/test.env'
console.log(configPath);
var GetConfig = /** @class */ (function () {
    function GetConfig(configPath) {
        dotenv_1.default.config({ path: configPath });
        this.port = process.env.PORT;
        this.protocol = process.env.PROTOCOL;
        this.bpiumUrl = process.env.BPIUM_URL;
        this.receiver = process.env.RECEIVER;
        this.callbackParsed = process.env.CALLBACK_PARSED;
        this.callbackTariff = process.env.CALLBACK_TARIFF;
        this.callbackNonValid = process.env.CALLBACK_NON_VALID;
    }
    return GetConfig;
}());
var bpiumConfig = new GetConfig(configPath);
console.log('Bpium config is:', bpiumConfig);
exports.default = bpiumConfig;
//# sourceMappingURL=GetConfig.js.map