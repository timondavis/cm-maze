import {expect} from 'chai';
import 'mocha';
import {Compass4, C4} from "../../Behavior/Compass4";
import {NodeLocation2D} from "../../MazeCoordinates/NodeLocation2D";
describe( 'Compass4', () => {

    let cb4 = new Compass4();

    it( 'represents a four directional compass: north, east, south and west, in CSS border ordering', () => {

        expect( C4.NORTH ).to.be.equal( 0 );
        expect( C4.N ).to.be.equal( 0 );

        expect( C4.EAST ).to.be.equal( 1 );
        expect( C4.E ).to.be.equal( 1 );

        expect( C4.SOUTH ).to.be.equal( 2 );
        expect( C4.S ).to.be.equal( 2 );

        expect( C4.WEST ).to.be.equal( 3 );
        expect( C4.W ).to.be.equal( 3 );
    });

    it( 'has a cardinality of 4 (ie it represents 4 directional points', () => {

        expect( cb4.getConnectionPointCount() ).to.be.equal( 4 );
    });

    it( 'can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', () => {

            expect( () => cb4.validateConnectionPoint(0) ).not.to.throw();
            expect( () => cb4.validateConnectionPoint(-1) ).to.throw();
            expect( () => cb4.validateConnectionPoint(3) ).not.to.throw();
            expect( () => cb4.validateConnectionPoint(4) ).to.throw();
    });

    it( 'can provide a given exit position\'s diametrically opposed position index', () => {

        expect( cb4.getOpposingConnectionPoint( C4.NORTH ) ).to.be.equal( C4.SOUTH );
        expect( cb4.getOpposingConnectionPoint( C4.SOUTH ) ).to.be.equal( C4.NORTH );

        expect( cb4.getOpposingConnectionPoint( C4.EAST ) ).to.be.equal( C4.WEST );
        expect( cb4.getOpposingConnectionPoint( C4.WEST ) ).to.be.equal( C4.EAST );
    });

    it( 'can convert a tuple array to a MazeCoordinate2D instance representing the given position', () => {

        let position: number[] = [1,6];
        let positionCoordinates = cb4.generateNodeLocation( position );

        expect( positionCoordinates ).to.be.an.instanceOf( NodeLocation2D );
        expect( positionCoordinates.dimensions ).to.be.equal( 2 );
        expect( positionCoordinates.position ).to.be.equal( position );
    });

    it( 'can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', () => {

        let spot = new NodeLocation2D( [0,0] );

        expect( cb4.getNextLocation(spot, C4.NORTH).position.toString() ).to.be.equal( [0, -1].toString() );
        expect( cb4.getNextLocation(spot, C4.EAST).position.toString() ).to.be.equal( [1, 0 ].toString() );
        expect( cb4.getNextLocation(spot, C4.SOUTH).position.toString() ).to.be.equal( [0, 1].toString() );
        expect( cb4.getNextLocation(spot, C4.WEST).position.toString() ).to.be.equal( [-1, 0].toString() );
    });
});