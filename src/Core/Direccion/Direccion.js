"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DireccionBase_1 = require("./DireccionBase");
var Direccion = (function (_super) {
    __extends(Direccion, _super);
    function Direccion() {
        _super.apply(this, arguments);
    }
    Direccion.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
    };
    return Direccion;
}(DireccionBase_1["default"]));
exports.__esModule = true;
exports["default"] = Direccion;
