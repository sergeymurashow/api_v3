"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fixVoyageNumber_1 = __importDefault(require("./fixVoyageNumber"));
var transcribeContractNumber_1 = __importDefault(require("./transcribeContractNumber"));
var clearString_1 = __importDefault(require("./clearString"));
var createCatalogs_1 = __importDefault(require("./createCatalogs"));
// import { sendParsed } from '../../callbacks/callbackParsedDocs'
// import { sendNonValid } from "../../callbacks/callbackNonValid";
var downloadFiles_1 = __importDefault(require("./downloadFiles"));
var counter_1 = __importDefault(require("./counter"));
exports.default = {
    fixVoyageNumber: fixVoyageNumber_1.default,
    transcribeContractNumber: transcribeContractNumber_1.default,
    clearString: clearString_1.default,
    createCatalogs: createCatalogs_1.default,
    downloadFiles: downloadFiles_1.default,
    Counter: counter_1.default,
    // sendParsed,
    // sendNonValid,
};
//# sourceMappingURL=index.js.map