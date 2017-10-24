"use strict";
var DireccionBase = (function () {
    function DireccionBase() {
    }
    DireccionBase.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
    };
    return DireccionBase;
}());
exports.__esModule = true;
exports["default"] = DireccionBase;
