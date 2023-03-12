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
var getContainersFromManifest_1 = __importDefault(require("./getContainersFromManifest"));
var parsingTools = __importStar(require("../prettyData"));
var ErrorCollector_1 = require("src/ErrorCollector");
function getBookingFromManifest(data, voyageNumber) {
    var Errors = new ErrorCollector_1.ErrorsCollector('Manifest errors');
    data.MENSION = data.MENSION.toString().replace(/[^\d]/g, '');
    var result = {};
    try {
        Object.assign(result, { bookingId: parsingTools.bookingId(data.BLNO) });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { voyageNumber: voyageNumber });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { pkgs: data.PKGS });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { packType: data.PACKAGETYPE });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { gWeight: data.GWEIGHT });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { desc: data.GOODS });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { shipper: data.SHIPPER });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { consignee: data.CONSIGNEE });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { notifyParty: data.NOTIFYPARTY });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { mark: data.MARK });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { remark: data.REMARK });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { owner: data.CONTAINEROWNER });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { type: data.TYPE });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { mension: data.MENSION });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { freight: data.FREIGHT });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, { isManifest: true });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    try {
        Object.assign(result, {
            containers: [
                (0, getContainersFromManifest_1.default)(data)
            ]
        });
    }
    catch (e) {
        Errors.errLog(e.message);
    }
    if (Errors.getErrors().length) {
        return Errors.getErrors();
    }
    return result;
    // hs: data.K ? data.K.replace(/\t+/g, '') : data.K,
}
exports.default = getBookingFromManifest;
//# sourceMappingURL=getBookingFromManifest.js.map