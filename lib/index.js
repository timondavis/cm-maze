"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeBuilder_1 = require("./MazeBuilder");
var MazeRenderer_1 = require("./Render/MazeRenderer");
(function () {
    var exportables = [MazeBuilder_1.MazeBuilder, MazeRenderer_1.MazeRenderer];
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        exportables.forEach(function (exp) { return module.exports[nameof(exp)] = exp; });
    }
    else if (typeof define === 'function' && define.amd) {
        exportables.forEach(function (exp) { return define(function () { return exp; }); });
    }
    else if (window) {
        exportables.forEach(function (exp) { return window[nameof(exp)] = exp; });
    }
    function nameof(fn) {
        return typeof fn === 'undefined' ? '' : fn.name ? fn.name : (function () {
            var result = /^function\s+([\w\$]+)\s*\(/.exec(fn.toString());
            return !result ? '' : result[1];
        })();
    }
})();
module.exports.MazeBuilder = MazeBuilder_1.MazeBuilder;
