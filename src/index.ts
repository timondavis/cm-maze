import {MazeBuilder} from "./MazeBuilder";
import {MazeRenderer} from "./Render/MazeRenderer";

declare var define: any;
declare var module: any;

( function() {


    let exportables = [MazeBuilder, MazeRenderer];

    if ( typeof module !== 'undefined' && typeof module.exports !== 'undefined' ) {
        exportables.forEach( exp => module.exports[nameof(exp)] = exp );
    } else if ( typeof define === 'function' && define.amd ) {
        exportables.forEach( exp => define( () => exp ) );
    } else if ( window ) {
        exportables.forEach( exp => (window as any )[nameof(exp)] = exp );
    }

    function nameof(fn: any): string {
        return typeof fn === 'undefined' ? '' : fn.name ? fn.name : (() => {
            let result = /^function\s+([\w\$]+)\s*\(/.exec(fn.toString());
            return !result ? '' : result[1];
        })();
    }


})();
module.exports.MazeBuilder = MazeBuilder;