"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getContainerFromManifest(data) {
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
exports.default = getContainerFromManifest;
//# sourceMappingURL=getContainersFromManifest.js.map