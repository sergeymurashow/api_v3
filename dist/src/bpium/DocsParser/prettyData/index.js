"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.owner = exports.freight = exports.port = exports.shipper = exports.gWeight = exports.containerType = exports.containersMension = exports.containersCount = exports.voyageNumber = exports.contract = exports.applicationDate = exports.bookingId = void 0;
var utils_1 = __importDefault(require("../../utils"));
var dayjs_1 = __importDefault(require("dayjs"));
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
/*
Transform and pretty data
*/
var bookingId = function (data) {
    data = utils_1.default.clearString(data);
    var chk = data.toString().match(/(INT|INJIAN)\d+/);
    if (chk) {
        return data;
    }
    else {
        throw new Error('Wrong booking ID!');
    }
};
exports.bookingId = bookingId;
var applicationDate = function (data) {
    if (data) {
        data = makeDate(utils_1.default.clearString(data));
        return data;
    }
    else {
        throw new Error('Wrong application date!');
    }
};
exports.applicationDate = applicationDate;
var contract = function (data) {
    if (data) {
        data = utils_1.default.transcribeContractNumber(utils_1.default.clearString(data));
        return data;
    }
    else {
        throw new Error('Wrong contract number');
    }
};
exports.contract = contract;
var voyageNumber = function (data) {
    data = utils_1.default.fixVoyageNumber(data);
    if (data) {
        return data;
    }
    else {
        throw new Error('Wrong voyage number');
    }
};
exports.voyageNumber = voyageNumber;
var containersCount = function (data) {
    var result = +utils_1.default.clearString(data);
    if (result) {
        return result;
    }
    else {
        throw new Error('Wrong number of containers');
    }
};
exports.containersCount = containersCount;
var containersMension = function (data) {
    data = utils_1.default.clearString(data);
    if (data) {
        return data.replace(/[^0-9]+/, '');
    }
    else {
        throw new Error('Wrong container type!');
    }
};
exports.containersMension = containersMension;
var containerType = function (data) {
    data = utils_1.default.clearString(data);
    if (data) {
        return data.replace(/[^a-zA-Z]+/, '');
    }
    else {
        throw new Error('Wrong container type!');
    }
};
exports.containerType = containerType;
var gWeight = function (data) {
    if (!data) {
        return null;
    }
    if (typeof data === 'number')
        data = data.toString();
    return data.replace(/[^\d,.]/, '');
};
exports.gWeight = gWeight;
var shipper = function (data) {
    data = utils_1.default.clearString(data);
    if (data) {
        return data;
    }
    else {
        throw new Error('Wrong shipper!');
    }
};
exports.shipper = shipper;
var port = function (data) {
    data = utils_1.default.clearString(data);
    if (data) {
        return data;
    }
    else {
        throw new Error('Wrong port!');
    }
};
exports.port = port;
var freight = function (data) {
    data = utils_1.default.clearString(data);
    if (data) {
        return data;
    }
    else {
        throw new Error('Wrong freight!');
    }
};
exports.freight = freight;
var owner = function (data) {
    if (data) {
        data = utils_1.default.clearString(data);
        return data;
    }
    else {
        throw new Error('Wrong SOC-COC!');
    }
};
exports.owner = owner;
/*
General functions
*/
function makeDate(chinaDate) {
    dayjs_1.default.extend(customParseFormat_1.default);
    dayjs_1.default.extend(utc_1.default);
    var dateFormat = function (cd) {
        if (/(\d{1,2}\.*){3}$/.test(cd))
            return 'M.D.YY';
        if (/(\d{1,2}\/*){3}$/.test(cd))
            return 'M/D/YY';
        if (/\d{4}\/\d{1,2}\/\d{1,2}/.test(cd))
            return 'YYYY/MM/DD';
    };
    var fixedDate = (0, dayjs_1.default)((chinaDate), dateFormat(chinaDate)).format('YYYY-MM-DDT00:00:00');
    return fixedDate;
}
//# sourceMappingURL=index.js.map