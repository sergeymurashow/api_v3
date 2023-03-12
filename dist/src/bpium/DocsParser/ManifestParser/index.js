"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var DocumentsParser_1 = __importDefault(require("../DocumentsParser"));
var FindTableTitle_1 = __importDefault(require("../FindTableTitle"));
var manifestGetVoyagePort_1 = __importDefault(require("../functions/manifestGetVoyagePort"));
var ManifestParser = /** @class */ (function (_super) {
    __extends(ManifestParser, _super);
    function ManifestParser(params) {
        var _this = _super.call(this, params) || this;
        var renamedTable = new FindTableTitle_1.default(_this.bigSheet, 'manifest').getTable();
        _this.table = renamedTable.table;
        _this.startIndex = renamedTable.startIndex;
        return _this;
    }
    Object.defineProperty(ManifestParser.prototype, "parsed", {
        get: function () {
            var _a = (0, manifestGetVoyagePort_1.default)(this.table), portCountry = _a.portCountry, loadingPort = _a.loadingPort, vesselVoyage = _a.vesselVoyage;
            var voyage = this.fixVoyageNumber(vesselVoyage);
            var collect = {};
            var tmp;
            this.table.forEach(function (fo) {
                var chk = fo.BLNO && fo.BLNO.match(/(INT|INJIAN)/);
                if (chk) {
                    tmp = fo;
                    collect[tmp.BLNO] = getBooking(fo, voyage);
                }
                else if (tmp && fo.CONTAINERNO) {
                    // if (fo.BLNO) collect[tmp.BLNO].hs = fo.BLNO
                    collect[tmp.BLNO]['containers'].push(getContainer(Object.assign({}, tmp, fo)));
                }
            });
            collect = lodash_1.default.toArray(collect);
            return lodash_1.default.sortBy(collect, 'bookingId');
        },
        enumerable: false,
        configurable: true
    });
    return ManifestParser;
}(DocumentsParser_1.default));
exports.default = ManifestParser;
// let t = new ManifestParser(file).parsed
function getBooking(data, voyageNumber) {
    try {
        data.MENSION = data.MENSION.toString().replace(/[^\d]/g, '');
    }
    catch (e) {
        console.error(e);
    }
    var result = function () {
        if (data.BLNO === 'INT00008719') {
            var t = void 0;
        }
        return {
            bookingId: data.BLNO,
            voyageNumber: voyageNumber,
            pkgs: data.PKGS,
            packType: data.PACKAGETYPE,
            gWeight: data.GWEIGHT,
            desc: data.GOODS,
            shipper: data.SHIPPER,
            consignee: data.CONSIGNEE,
            notifyParty: data.NOTIFYPARTY,
            mark: data.MARK,
            remark: data.REMARK,
            owner: data.CONTAINEROWNER ? data.CONTAINEROWNER.toString().replace(/[^a-zA-Z]/g, '') : data.CONTAINEROWNER,
            type: "".concat(data.MENSION).concat(data.TYPE),
            // hs: data.K ? data.K.replace(/\t+/g, '') : data.K,
            freight: data.FREIGHT,
            isManifest: [1],
            docType: 'manifest',
            containers: [
                getContainer(data)
            ]
        };
    };
    try {
        return result();
    }
    catch (e) {
        console.group('Error');
        console.error(e);
        console.error(data);
        console.groupEnd();
        return { bookingId: null, errorMsg: JSON.stringify(data, null, 1) };
    }
}
function getContainer(data) {
    try {
        data.CONTAINERNO = data.CONTAINERNO.toString().replace(/[^\d\w]/g, '');
    }
    catch (e) {
        console.log(typeof data.CONTAINERNO);
    }
    var resp;
    try {
        resp = {
            vol: data.VOLUME,
            number: data.CONTAINERNO,
            seal: data.SEAL,
            packages: data.PKGS_2,
            gWeight: data.GWEIGHT_2,
            tWeight: data.CONTAINERTAREWEIGHT,
            cbm: data.CBM,
            freight: data.FREIGHT,
            owner: data.CONTAINEROWNER ? data.CONTAINEROWNER.toString().replace(/\t+/g, '') : data.CONTAINEROWNER,
            type: data.MENSION.toString().replace(/[^\d]/g, '') + data.TYPE.toString().replace(/[^a-zA-Z]/g, '')
        };
    }
    catch (e) {
        console.log(e);
    }
    return resp;
}
//# sourceMappingURL=index.js.map