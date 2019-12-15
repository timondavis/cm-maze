import 'mocha';
import { expect } from "chai";
import {MazeBuilder} from "../../MazeBuilder";
import {Maze} from "../../Maze";
import {Compass8} from "../../Behavior/Compass8";
import {Compass4} from "../../Behavior/Compass4";
import {MazeNode} from "../../MazeNode";

describe( 'MazeBuilder', () => {

    let MB: MazeBuilder;

    it( 'generates randomized mazes composed of randomly interconnected graph nodes', () => {

        MB = new MazeBuilder();

        let a: Maze = MB.buildMaze();
        let b: Maze = MB.buildMaze();
        let c: Maze = MB.buildMaze();

        let d: Maze = MB.buildMaze();
        let e: Maze = MB.buildMaze();
        let f: Maze = MB.buildMaze();

        expect(a.getSize() + b.getSize() + c.getSize()).not.to.be.equal( d.getSize() + e.getSize() + f.getSize());
    });

    it( 'can enforce cardinality behaviors to all MazeNodes by applying an instance of CardinalityBehavior', () => {

        MB = new MazeBuilder( { cardinality: new Compass8() } );
        let a: Maze = MB.buildMaze();
        expect( a.getStartNode().getCardinality() ).to.be.an.instanceOf( Compass8 );

        MB = new MazeBuilder();
        let b: Maze = MB.buildMaze();
        expect( b.getStartNode().getCardinality() ).to.be.an.instanceOf( Compass4 );
    });

    it( 'facilitates integer randomization as a static convenience service', () => { //@TODO Known Bug - fix!

        let min = 0;
        let max = 3;

        let numbersFound = [ false, false, false, false ];

        for ( let i = 0 ; i < 1000 ; i++ ) {

            expect( () => { numbersFound[ MazeBuilder.rand( max, min) ] = true; } ).not.to.throw();
        }

        for ( let i = 0 ; i <= max ; i++ ) {

            expect( numbersFound[i] ).to.be.true;
        }
    });

    it( 'will provide a coordinate collection of nodes generated by the build algorithm', () => {

        MB = new MazeBuilder();
        let maze = MB.buildMaze();

        expect( Object.keys( MB.maze.getNodes() ) ).to.have.length.greaterThan( 0 );
    });

    it ( 'will never create a room with all exits sealed', () => {

        let mb4 = new MazeBuilder(new Compass4(), 150);
        let mb8 = new MazeBuilder(new Compass8(), 150);
        let maze4 = mb4.buildMaze();
        let maze8 = mb8.buildMaze();

        maze4.getNodesArray().forEach((node: MazeNode) => {
            expect(node.getAvailableConnectionPoints().length).not.to.be.equal(4);
        });

        maze8.getNodesArray().forEach((node: MazeNode) => {
            expect(node.getAvailableConnectionPoints().length).not.to.be.equal(8);
        });
    });

    // Tricky/expensive to prove without a search algorithm.  Will implement this on the official.  Mean while, these tests are pending.
    it( 'can generate a random path from a given node' );
    it( 'can generate a random path from a random existing node (sourced from provided node)' );
    // Has consistency issues.  Foregoing testing until solved.
    it( 'has a configurable complexity which determines the size, difficulty of maze' );

});