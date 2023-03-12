"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let str = [{
// 	BLNO: "sdlfkjsdkjf",
// 	PKGS: "XIN LONG YUN 55I07N55",
// 	GOODS: "DISCH PORT",
// 	SHIPPER: "VOSTOCHNY,RUSSIA",
// 	CONTAINERNO: "LOADING PORT",
// 	SEAL: "NINGBO,CHINA",
// }, {
// 	BLNO: "SHIP NAME VOYAGE",
// 	QWEQWEwq: '',
// 	PKGS: "XIN LONG YUN 55I07N55",
// 	GOODS: "DISCH PORT",
// 	SHIPPER: "VOSTOCHNY,RUSSIA",
// 	CONTAINERNO: "LOADING PORT",
// 	SEAL: "NINGBO,CHINA",
// }]
var regs = {
    shipnameReg: new RegExp(/SHIP\s*NAME\s*VOYAGE/),
    dischPortReg: new RegExp(/DISCH\s*PORT/),
    loadingPortReg: new RegExp(/LOADING\s*PORT/)
};
function findVoyageString(str) {
    return str.find(function (fi) {
        var fiStr = Object.values(fi).join(' | ');
        return regs.shipnameReg.test(fiStr);
    });
}
function getValueByReg(strObj, reg) {
    var tmp;
    for (var i in strObj) {
        var value = strObj[i];
        if (reg.test(value)) {
            tmp = i;
        }
        else if (value && value.length && tmp) {
            return value;
        }
    }
}
/**
 *
 * @param table Parsed table in Type Headers.Manifest
 * @return vesselVoyage and portCountry
 *
 */
function manifestGetVoyagePort(table) {
    var stringWithShipname = findVoyageString(table);
    var vesselVoyage = getValueByReg(stringWithShipname, regs.shipnameReg);
    var portCountry = getValueByReg(stringWithShipname, regs.dischPortReg);
    var loadingPort = getValueByReg(stringWithShipname, regs.loadingPortReg);
    return {
        vesselVoyage: vesselVoyage,
        portCountry: portCountry,
        loadingPort: loadingPort
    };
}
exports.default = manifestGetVoyagePort;
//# sourceMappingURL=manifestGetVoyagePort.js.map