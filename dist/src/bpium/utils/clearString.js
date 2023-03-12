"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clearString(data) {
    if (!data)
        return null;
    if (typeof data === 'number')
        return data.toString();
    try {
        if (!data)
            return;
        return data.replace(/(^\s+|\s+$)/g, '');
    }
    catch (err) {
        console.error(err);
    }
}
exports.default = clearString;
//# sourceMappingURL=clearString.js.map