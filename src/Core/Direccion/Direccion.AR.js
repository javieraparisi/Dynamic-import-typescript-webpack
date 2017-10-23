"use strict";
var Direccion = (function () {
    function Direccion() {
    }
    Direccion.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
    };
    return Direccion;
}());
exports.__esModule = true;
exports["default"] = Direccion;
