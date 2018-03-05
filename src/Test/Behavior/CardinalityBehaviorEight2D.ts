import {expect} from 'chai';
import 'mocha';
import {MazeCoordinates2D} from "../../MazeCoordinates/MazeCoordinates2D";
import {CB8_CARD} from "../../Behavior/CardinalityBehaviorEight2D";
import {CardinalityBehaviorEight2D} from "../../Behavior/CardinalityBehaviorEight2D";
describe( 'CardinalityBehaviorEight2D', () => {

    let cb8 = new CardinalityBehaviorEight2D();

    it( 'represents an eight directional compass: N, NE, E, SE, S, SW, W, and NW , clockwise from the top', () => {

        expect( CB8_CARD.NORTH ).to.be.equal( 0 );
        expect( CB8_CARD.N ).to.be.equal( 0 );

        expect( CB8_CARD.NORTH_EAST ).to.be.equal( 1 );
        expect( CB8_CARD.NE ).to.be.equal( 1 );

        expect( CB8_CARD.EAST ).to.be.equal( 2 );
        expect( CB8_CARD.E ).to.be.equal( 2 );

        expect( CB8_CARD.SOUTH_EAST ).to.be.equal( 3 );
        expect( CB8_CARD.SE ).to.be.equal( 3 );

        expect( CB8_CARD.SOUTH ).to.be.equal( 4 );
        expect( CB8_CARD.S ).to.be.equal( 4 );

        expect( CB8_CARD.SOUTH_WEST ).to.be.equal( 5 );
        expect( CB8_CARD.SW ).to.be.equal( 5 );

        expect( CB8_CARD.WEST ).to.be.equal( 6 );
        expect( CB8_CARD.W ).to.be.equal( 6 );

        expect( CB8_CARD.NORTH_WEST ).to.be.equal( 7 );
        expect( CB8_CARD.NW ).to.be.equal( 7 );
    });

    it( 'has a cardinality of 8 (ie it represents 8 directional points', () => {

        expect( cb8.getCardinality() ).to.be.equal( 8 );
    });

    it( 'can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', () => {

            expect( () => cb8.validatePosition( 0 ) ).not.to.throw();
            expect( () => cb8.validatePosition( -1 ) ).to.throw();
            expect( () => cb8.validatePosition( 7) ).not.to.throw();
            expect( () => cb8.validatePosition( 8 ) ).to.throw();
    });

    it( 'can provide a given exit position\'s diametrically opposed position index', () => {

        expect( cb8.getOpposingPoint( CB8_CARD.NORTH ) ).to.be.equal( CB8_CARD.SOUTH );
        expect( cb8.getOpposingPoint( CB8_CARD.SOUTH ) ).to.be.equal( CB8_CARD.NORTH );

        expect( cb8.getOpposingPoint( CB8_CARD.NW ) ).to.be.equal( CB8_CARD.SE );
        expect( cb8.getOpposingPoint( CB8_CARD.SE ) ).to.be.equal( CB8_CARD.NW );

        expect( cb8.getOpposingPoint( CB8_CARD.EAST ) ).to.be.equal( CB8_CARD.WEST );
        expect( cb8.getOpposingPoint( CB8_CARD.WEST ) ).to.be.equal( CB8_CARD.EAST );

        expect( cb8.getOpposingPoint( CB8_CARD.SW ) ).to.be.equal( CB8_CARD.NE );
        expect( cb8.getOpposingPoint( CB8_CARD.NE ) ).to.be.equal( CB8_CARD.SW );
    });

    it( 'can convert a tuple array to a MazeCoordinate2D instance representing the given position', () => {

        let position: number[] = [1,6];
        let positionCoordinates = cb8.generateCoordinates( position );

        expect( positionCoordinates ).to.be.an.instanceOf( MazeCoordinates2D );
        expect( positionCoordinates.getDimensions() ).to.be.equal( 2 );
        expect( positionCoordinates.getPosition() ).to.be.equal( position );
    });

    it( 'can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', () => {

        let spot = new MazeCoordinates2D( [0,0] );

        expect( cb8.getNextCoordinates( spot, CB8_CARD.NORTH ).getPosition().toString() ).to.be.equal( [0, -1].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.NE ).getPosition().toString() ).to.be.equal( [1, -1].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.EAST ).getPosition().toString() ).to.be.equal( [1, 0 ].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.SE ).getPosition().toString() ).to.be.equal( [1, 1].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.SOUTH ).getPosition().toString() ).to.be.equal( [0, 1].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.SW ).getPosition().toString() ).to.be.equal( [-1, 1].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.WEST ).getPosition().toString() ).to.be.equal( [-1, 0].toString() );
        expect( cb8.getNextCoordinates( spot, CB8_CARD.NW ).getPosition().toString() ).to.be.equal( [-1, -1].toString() );
    });
});