import 'mocha';
import { expect } from "chai";
import {MazeBuilder} from "../MazeBuilder";
import {CardinalityBehaviorEight2D} from "../Behavior/CardinalityBehaviorEight2D";
import {MazeNode} from "../MazeNode";

describe( 'MazeBuilder', () => {

    it( 'generates node graphs with random layouts', () => {

        MazeNode.toggleDebug( true );
        const M = new MazeBuilder( new CardinalityBehaviorEight2D(), 20 );

        M.buildMaze();

        let mc = M.getCoordinatesCollection();

        Object.keys(mc).forEach( key => console.log( mc[key].toString() ));
    });

    it( 'generates random numbers between a requested range', () => {

        let number = 0;

        for ( let i = 0 ; i < 2000 ; i++ ) {

            number = MazeBuilder.rand( 400, 200 );
            expect( number ).to.be.greaterThan( 199 );
            expect( number ).to.be.lessThan( 401 );
        }
    });

});