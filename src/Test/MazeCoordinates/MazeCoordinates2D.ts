import { MazeCoordinates2D } from "../../../lib/MazeCoordinates/MazeCoordinates2D";
import { expect } from 'chai';
import 'mocha';
import {MazeBuilder} from "../../MazeBuilder";

describe( 'MazeCoordinates2D', () => {

   let mc = new MazeCoordinates2D();
   let r = 10; // This is the base random number used throughout the tests

   it( 'can be instantiated to 0,0 by default, or coordinates can be passed into the constructor', () => {

       const x = MazeBuilder.rand( r );
       const y = MazeBuilder.rand( r );

       mc = new MazeCoordinates2D();
       expect( mc.getPosition().toString() ).to.be.equal( [0,0].toString() );

       mc = new MazeCoordinates2D( [x,y] );
       expect( mc.getPosition().toString() ).to.be.equal( [x,y].toString() );
   });

   it( 'facilitates updates to the coordinate\'s entire position', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       const next = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

       mc = new MazeCoordinates2D( old );
       mc.updatePosition( next );

       expect( mc.getPosition().toString() ).to.be.equal( next.toString() );
   });

   it( 'facilitates updates to a single dimension by providing a new value (ie. update X or Y)', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       const next = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

       mc = new MazeCoordinates2D( old );
       mc.updateDimension( 1, next[1] )

       expect( mc.getPosition().toString() ).to.be.equal( [ old[0], next[1] ].toString() );
   });

   it( 'facilitates updates to a single dimension by providing a delta value (ie. update X or Y', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       const delta = MazeBuilder.rand( r );

       mc = new MazeCoordinates2D( old );
       mc.adjustDimension( 0, delta );

       expect( mc.getPosition().toString() ).to.be.equal( [ old[0] + delta, old[1]].toString() );
   });

   it( 'provides reports on position by dimension, among other means (provided by other tests)', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

       mc = new MazeCoordinates2D( old );

       expect( mc.getDimension(0 ) ).to.be.equal( old[0] );
       expect( mc.getDimension( 1 ) ).to.be.equal( old[1] );
   });

   it( 'provides reports on position by returning a 2-element array (x,y)', ()  => {

        const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

        mc = new MazeCoordinates2D( old );

        expect( mc.getPosition().toString() ).to.be.equal( old.toString() );
   });

   it( 'converts arrays into strings as a static service, which facilitates hashmapping and comparisons', () => {

       const old = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];
       mc = new MazeCoordinates2D( old );

       expect( MazeCoordinates2D.encodeCoorindateArray( 2, old ) ).to.be.equal( "[" + old.toString() + "]" );
       expect( "[" + old.toString() + "]").to.be.equal( MazeCoordinates2D.encodeCoorindateArray( 2, old ) );
   });

   it( 'should report, as a number, how many dimensions this coordinate facilitates', () => {

       mc = new MazeCoordinates2D();
       expect( mc.getDimensions() ).to.be.equal( 2 );
   });


});