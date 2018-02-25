import 'mocha';
import { expect } from "chai";
import {MazeBuilder} from "../MazeBuilder";
import {CardinalityBehaviorEight2D} from "../Behavior/CardinalityBehaviorEight2D";
import {MazeNode} from "../MazeNode";
import {Maze} from "../Maze";

describe( 'MazeBuilder', () => {

    it( 'works', () => {

        MazeNode.toggleDebug( true );
        const M = new MazeBuilder( new CardinalityBehaviorEight2D(), 10 );
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