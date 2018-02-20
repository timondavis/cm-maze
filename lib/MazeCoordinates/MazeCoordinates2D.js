"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MazeCoordinates_1 = require("./MazeCoordinates");
var D2D;
(function (D2D) {
    D2D[D2D["X"] = 0] = "X";
    D2D[D2D["Y"] = 1] = "Y";
})(D2D = exports.D2D || (exports.D2D = {}));
;
var MazeCoordinates2D = /** @class */ (function (_super) {
    __extends(MazeCoordinates2D, _super);
    function MazeCoordinates2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MazeCoordinates2D.prototype.getDimensionValue = function () {
        return 2;
    };
    return MazeCoordinates2D;
}(MazeCoordinates_1.MazeCoordinates));
exports.MazeCoordinates2D = MazeCoordinates2D;
