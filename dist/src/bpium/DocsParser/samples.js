"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var samples = {
    'contract': [
        'DATE',
        'S/C',
        'BOOKING NO',
        'NUMBER OF CONTAINER',
        'TYPE',
        'GROSS WEIGHT',
        'SHIPPER',
        'VESSEL',
        'ETD',
        'POL',
        'SOC-COC',
        'FREIGHT TERM'
    ],
    'manifest': [
        'BL NO',
        'PKGS',
        'PACKAGE TYPE',
        'G/WEIGHT',
        'GOODS',
        'SHIPPER',
        'CONSIGNEE',
        'NOTIFY PARTY',
        'MARK',
        'REMARK',
        'MENSION',
        'TYPE',
        'VOLUME',
        'CONTAINER NO',
        'SEAL',
        'PKGS',
        'G/WEIGHT',
        'CONTAINER TARE WEIGHT',
        'CBM',
        'FREIGHT',
        'CONTAINER OWNER'
    ],
    getWithAliases: function (docType) {
        var tmp = [];
        var mappedNames = this[docType].map(function (m) {
            var alias = m.replace(/[^\w\d]/g, '');
            var tryAlias = tmp.filter(function (f) { return f == alias; });
            tmp.push(alias);
            if (tryAlias.length) {
                alias = "".concat(alias, "_").concat(tryAlias.length + 1);
            }
            return {
                cellName: m,
                alias: alias
            };
        });
        return mappedNames;
    }
};
exports.default = samples;
//# sourceMappingURL=samples.js.map