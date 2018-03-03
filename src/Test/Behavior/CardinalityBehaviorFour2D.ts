import {expect} from 'chai';
import 'mocha';
import {CardinalityBehaviorFour2D, CB4_CARD} from "../../Behavior/CardinalityBehaviorFour2D";
import {MazeCoordinates2D} from "../../MazeCoordinates/MazeCoordinates2D";
describe( 'CardinalityBehaviorFour2D', () => {

    let cb4 = new CardinalityBehaviorFour2D();

    it( 'represents a four directional compass: north, east, south and west, in CSS border ordering', () => {

        expect( CB4_CARD.NORTH ).to.be.equal( 0 );
        expect( CB4_CARD.N ).to.be.equal( 0 );

        expect( CB4_CARD.EAST ).to.be.equal( 1 );
        expect( CB4_CARD.E ).to.be.equal( 1 );

        expect( CB4_CARD.SOUTH ).to.be.equal( 2 );
        expect( CB4_CARD.S ).to.be.equal( 2 );

        expect( CB4_CARD.WEST ).to.be.equal( 3 );
        expect( CB4_CARD.W ).to.be.equal( 3 );
    });

    it( 'has a cardinality of 4 (ie it represents 4 directional points', () => {

        expect( cb4.getCardinality() ).to.be.equal( 4 );
    });

    it( 'can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', () => {

            expect( () => cb4.validatePosition( 0 ) ).not.to.throw();
            expect( () => cb4.validatePosition( -1 ) ).to.throw();
            expect( () => cb4.validatePosition( 3 ) ).not.to.throw();
            expect( () => cb4.validatePosition( 4 ) ).to.throw();
    });

    it( 'can provide a given exit position\'s diametrically opposed position index', () => {

        expect( cb4.getOpposingPoint( CB4_CARD.NORTH ) ).to.be.equal( CB4_CARD.SOUTH );
        expect( cb4.getOpposingPoint( CB4_CARD.SOUTH ) ).to.be.equal( CB4_CARD.NORTH );

        expect( cb4.getOpposingPoint( CB4_CARD.EAST ) ).to.be.equal( CB4_CARD.WEST );
        expect( cb4.getOpposingPoint( CB4_CARD.WEST ) ).to.be.equal( CB4_CARD.EAST );
    });

    it( 'can convert a tuple array to a MazeCoordinate2D instance representing the given position', () => {

        let position: number[] = [1,6];
        let positionCoordinates = cb4.generateCoordinates( position );

        expect( positionCoordinates ).to.be.an.instanceOf( MazeCoordinates2D );
        expect( positionCoordinates.getDimensions() ).to.be.equal( 2 );
        expect( positionCoordinates.getPosition() ).to.be.equal( position );
    });

    it( 'can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', () => {

        let spot = new MazeCoordinates2D( [0,0] );

        expect( cb4.getNextCoordinates( spot, CB4_CARD.NORTH ).getPosition().toString() ).to.be.equal( [0, -1].toString() );
        expect( cb4.getNextCoordinates( spot, CB4_CARD.EAST ).getPosition().toString() ).to.be.equal( [1, 0 ].toString() );
        expect( cb4.getNextCoordinates( spot, CB4_CARD.SOUTH ).getPosition().toString() ).to.be.equal( [0, 1].toString() );
        expect( cb4.getNextCoordinates( spot, CB4_CARD.WEST ).getPosition().toString() ).to.be.equal( [-1, 0].toString() );
    });
});