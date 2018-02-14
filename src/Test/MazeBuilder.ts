import 'mocha';
import { expect } from "chai";
import {MazeBuilder} from "../MazeBuilder";

describe( 'MazeBuilder', () => {

    it( 'generates node graphs with random layouts', () => {

        const M = new MazeBuilder();
        const N = new MazeBuilder();

        M.buildMaze();
        N.buildMaze();


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