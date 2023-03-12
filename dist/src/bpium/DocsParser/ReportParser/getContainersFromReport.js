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
var lodash_1 = __importDefault(require("lodash"));
var parsingTools = __importStar(require("../prettyData"));
function containersParse(data) {
    var chkMultiTypesReg = /(20|40)/g;
    var chkMultiTypes = data.TYPE.match(chkMultiTypesReg).length === 1 ? false : true;
    if (!chkMultiTypes)
        return containersGenerate({
            count: data.NUMBEROFCONTAINER,
            type: parsingTools.containerType(data.TYPE),
            mension: parsingTools.containersMension(data.TYPE),
            freight: data.FREIGHTTERM,
            owner: data.SOCCOC
        });
    else {
        var typesReg = /(\d)+[*Xx](20|40)\w+/g;
        var types = data.TYPE.match(typesReg);
        var mapped = types.map(function (m) {
            var ansArr = [];
            var typeReg = /(?<count>\d+).*?(?<type>(20|40)\w+)/;
            var parsedType = m.match(typeReg);
            if (parsedType.groups) {
                Object.assign(parsedType.groups, { freight: data.FREIGHTTERM }, { owner: data.SOCCOC });
                var req = parsedType.groups;
                ansArr = ansArr.concat(containersGenerate(req));
            }
            return ansArr;
        });
        return lodash_1.default.flatten(mapped);
    }
}
exports.default = containersParse;
function getContainer(data) {
    var resp;
    try {
        resp = {
            number: 'reported',
            freight: data.freight,
            owner: data.owner,
            type: data.type,
            mension: data.mension
        };
    }
    catch (e) {
        console.log(e);
    }
    return resp;
}
function containersGenerate(_a) {
    var count = _a.count, type = _a.type, mension = _a.mension, freight = _a.freight, owner = _a.owner;
    var resp = [];
    for (var i = 1; i <= count; i++) {
        resp.push(getContainer({
            type: type,
            mension: mension,
            freight: freight,
            owner: owner
        }));
    }
    return resp;
}
//# sourceMappingURL=getContainersFromReport.js.map