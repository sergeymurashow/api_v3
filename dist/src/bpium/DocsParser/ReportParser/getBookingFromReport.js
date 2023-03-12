"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCollector_1 = require("src/ErrorCollector");
var parsingTools = __importStar(require("../prettyData"));
var getContainersFromReport_1 = __importDefault(require("./getContainersFromReport"));
function getBookingFromReport(data) {
    var Errors = new ErrorCollector_1.ErrorsCollector('Report errors');
    var result = {};
    try {
        Object.assign(result, { bookingId: parsingTools.bookingId(data.BOOKINGNO) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { applicationDate: parsingTools.applicationDate(data.DATE) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { contract: parsingTools.contract(data.SC) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { voyageNumber: parsingTools.voyageNumber(data.VESSEL) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { containersCount: parsingTools.containersCount(data.NUMBEROFCONTAINER) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { mension: parsingTools.containersMension(data.TYPE) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { type: parsingTools.containerType(data.TYPE) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { gWeight: parsingTools.gWeight(data.GROSSWEIGHT) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { shipper: parsingTools.shipper(data.SHIPPER) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { port: parsingTools.port(data.POL) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { freight: parsingTools.freight(data.FREIGHTTERM) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { owner: parsingTools.owner(data.SOCCOC) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { docType: 'contract' });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { containers: (0, getContainersFromReport_1.default)(data) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    console.log(Errors.getErrors());
    return result;
}
exports.default = getBookingFromReport;
//# sourceMappingURL=getBookingFromReport.js.map