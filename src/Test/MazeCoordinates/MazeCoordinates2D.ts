import { NodeLocation2D } from "../../MazeCoordinates/NodeLocation2D";
import { expect } from 'chai';
import 'mocha';
import {MazeBuilder} from "../../Maze/MazeBuilder";

describe( 'NodeLocation2D', () => {

   let mc = new NodeLocation2D();
   let r = 10; // This is the base random number used throughout the tests

   it( 'can be instantiated to 0,0 by default, or coordinates can be passed into the constructor', () => {

       const x = MazeBuilder.rand( r );
       const y = MazeBuilder.rand( r );

       mc = new NodeLocation2D();
       expect( mc.position.toString() ).to.be.equal( [0,0].toString() );

       mc = new NodeLocation2D( [x,y] );
       expect( mc.position.toString() ).to.be.equal( [x,y].toString() );
   });

   it( 'facilitates updates to the coordinate\'s entire position', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       const next = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

       mc = new NodeLocation2D( old );
       mc.updatePosition( next );

       expect( mc.position.toString() ).to.be.equal( next.toString() );
   });

   it( 'facilitates updates to a single dimension by providing a new value (ie. update X or Y)', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       const next = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

       mc = new NodeLocation2D( old );
       mc.updateAxisPoint(1, next[1]);

       expect( mc.position.toString() ).to.be.equal( [ old[0], next[1] ].toString() );
   });

   it( 'facilitates updates to a single dimension by providing a delta value (ie. update X or Y', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       const delta = MazeBuilder.rand( r );

       mc = new NodeLocation2D( old );
       mc.adjustAxisPoint(0, delta);

       expect( mc.position.toString() ).to.be.equal( [ old[0] + delta, old[1]].toString() );
   });

   it( 'provides reports on position by dimension, among other means (provided by other tests)', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

       mc = new NodeLocation2D( old );

       expect( mc.getAxisPoint(0) ).to.be.equal( old[0] );
       expect( mc.getAxisPoint(1) ).to.be.equal( old[1] );
   });

   it( 'provides reports on position by returning a 2-element array (x,y)', ()  => {

        const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

        mc = new NodeLocation2D( old );

        expect( mc.position.toString() ).to.be.equal( old.toString() );
   });

   it( 'converts arrays into strings as a static service, which facilitates hashmapping and comparisons', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       mc = new NodeLocation2D( old );

       expect( NodeLocation2D.encodePositionArray(old) ).to.be.equal( "[" + old.toString() + "]" );
       expect( "[" + old.toString() + "]").to.be.equal( NodeLocation2D.encodePositionArray(old) );
   });

   it( 'should report, as a number, how many dimensions this coordinate facilitates', () => {

       mc = new NodeLocation2D();
       expect( mc.dimensions ).to.be.equal( 2 );
   });

   it ( 'facilitates capturing location with a getter', () => {
       const nodeLocation = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       mc = new NodeLocation2D(nodeLocation);
       expect(mc.position).to.be.equal(nodeLocation);
   });

   it ( 'provides X and Y coordinates with specific named functions (specialized for 2D version', () => {

       const nodeLocation = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       mc = new NodeLocation2D(nodeLocation);
       expect(mc.getX()).to.be.equal(nodeLocation[0]);
       expect(mc.getY()).to.be.equal(nodeLocation[1]);
   });
});
