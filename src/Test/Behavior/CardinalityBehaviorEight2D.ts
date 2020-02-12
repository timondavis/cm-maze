import {expect} from 'chai';
import 'mocha';
import {NodeLocation2D} from "../../MazeCoordinates/NodeLocation2D";
import {C8} from "../../Behavior/Compass8";
import {Compass8} from "../../Behavior/Compass8";
describe( 'Compass8', () => {

    let cb8 = new Compass8();

    it( 'represents an eight directional compass: N, NE, E, SE, S, SW, W, and NW , clockwise from the top', () => {

        expect( C8.NORTH ).to.be.equal( 0 );
        expect( C8.N ).to.be.equal( 0 );

        expect( C8.NORTH_EAST ).to.be.equal( 1 );
        expect( C8.NE ).to.be.equal( 1 );

        expect( C8.EAST ).to.be.equal( 2 );
        expect( C8.E ).to.be.equal( 2 );

        expect( C8.SOUTH_EAST ).to.be.equal( 3 );
        expect( C8.SE ).to.be.equal( 3 );

        expect( C8.SOUTH ).to.be.equal( 4 );
        expect( C8.S ).to.be.equal( 4 );

        expect( C8.SOUTH_WEST ).to.be.equal( 5 );
        expect( C8.SW ).to.be.equal( 5 );

        expect( C8.WEST ).to.be.equal( 6 );
        expect( C8.W ).to.be.equal( 6 );

        expect( C8.NORTH_WEST ).to.be.equal( 7 );
        expect( C8.NW ).to.be.equal( 7 );
    });

    it( 'has a cardinality of 8 (ie it represents 8 directional points', () => {

        expect( cb8.getConnectionPointCount() ).to.be.equal( 8 );
    });

    it( 'can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', () => {

            expect( () => cb8.validateConnectionPoint(0) ).not.to.throw();
            expect( () => cb8.validateConnectionPoint(-1) ).to.throw();
            expect( () => cb8.validateConnectionPoint(7) ).not.to.throw();
            expect( () => cb8.validateConnectionPoint(8) ).to.throw();
    });

    it( 'can provide a given exit position\'s diametrically opposed position index', () => {

        expect( cb8.getOpposingConnectionPoint( C8.NORTH ) ).to.be.equal( C8.SOUTH );
        expect( cb8.getOpposingConnectionPoint( C8.SOUTH ) ).to.be.equal( C8.NORTH );

        expect( cb8.getOpposingConnectionPoint( C8.NW ) ).to.be.equal( C8.SE );
        expect( cb8.getOpposingConnectionPoint( C8.SE ) ).to.be.equal( C8.NW );

        expect( cb8.getOpposingConnectionPoint( C8.EAST ) ).to.be.equal( C8.WEST );
        expect( cb8.getOpposingConnectionPoint( C8.WEST ) ).to.be.equal( C8.EAST );

        expect( cb8.getOpposingConnectionPoint( C8.SW ) ).to.be.equal( C8.NE );
        expect( cb8.getOpposingConnectionPoint( C8.NE ) ).to.be.equal( C8.SW );
    });

    it( 'can convert a tuple array to a MazeCoordinate2D instance representing the given position', () => {

        let position: number[] = [1,6];
        let positionCoordinates = cb8.generateNodeLocation( position );

        expect( positionCoordinates ).to.be.an.instanceOf( NodeLocation2D );
        expect( positionCoordinates.dimensions ).to.be.equal( 2 );
        expect( positionCoordinates.position ).to.be.equal( position );
    });

    it( 'can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', () => {

        let spot = new NodeLocation2D( [0,0] );

        expect( cb8.getNextLocation(spot, C8.NORTH).position.toString() ).to.be.equal( [0, -1].toString() );
        expect( cb8.getNextLocation(spot, C8.NE).position.toString() ).to.be.equal( [1, -1].toString() );
        expect( cb8.getNextLocation(spot, C8.EAST).position.toString() ).to.be.equal( [1, 0 ].toString() );
        expect( cb8.getNextLocation(spot, C8.SE).position.toString() ).to.be.equal( [1, 1].toString() );
        expect( cb8.getNextLocation(spot, C8.SOUTH).position.toString() ).to.be.equal( [0, 1].toString() );
        expect( cb8.getNextLocation(spot, C8.SW).position.toString() ).to.be.equal( [-1, 1].toString() );
        expect( cb8.getNextLocation(spot, C8.WEST).position.toString() ).to.be.equal( [-1, 0].toString() );
        expect( cb8.getNextLocation(spot, C8.NW).position.toString() ).to.be.equal( [-1, -1].toString() );
    });
});