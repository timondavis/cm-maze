import {MazeBuilder} from "../../MazeBuilder";
import {Maze} from "../../Maze";
import {Compass4, C4} from "../../Behavior/Compass4";
import {expect} from 'chai';
import 'mocha';
import {MazeNode} from "../../MazeNode";
import {NodeLocation2D} from "../../MazeCoordinates/NodeLocation2D";
import {NodeLocation} from "../..";

describe( 'Maze', () => {

    let m = new Maze();

    it( 'allows CardinalityBehavior to be set and reported on the Maze', () => {

        m = new Maze();
        m.setCardinality( new Compass4() );

       expect( m.getCardinality() ).to.be.instanceOf( Compass4 );
    });

    it( 'can be assigned a node dictionary, and it can report the dictionary back to a caller', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );
        let d = new MazeNode( new Compass4() );
        let e = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};
        let capturedNodeCollection: { [key:string] : MazeNode };

        nodeCollection[ a.id ] = a;
        nodeCollection[ b.id ] = b;
        nodeCollection[ c.id ] = c;
        nodeCollection[ d.id ] = d;
        nodeCollection[ e.id ] = e;

        m.setNodes( nodeCollection );
        capturedNodeCollection = m.getNodes();

        expect( capturedNodeCollection[a.id] ).to.be.equal( a );
        expect( capturedNodeCollection[b.id] ).to.be.equal( b );
        expect( capturedNodeCollection[c.id] ).to.be.equal( c );
        expect( capturedNodeCollection[d.id] ).to.be.equal( d );
        expect( capturedNodeCollection[e.id] ).to.be.equal( e );
    });

    it( 'can return nodes residing at the indicated coordinates', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));

        nodeCollection[ a.id ] = a;
        nodeCollection[ b.id ] = b;

        m.setNodes( nodeCollection );

        expect( m.getNodeAtLocation( new NodeLocation2D( [1,2] )).id ).to.be.equal( b.id );
    });

    it( 'facilitates definition of "starting" and "ending" nodes', () =>  {
        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [2, 1] ));

        m.setStartNode( a );
        m.setFinishNode( c );

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;
        nodeCollection[ c.getLocation().toString() ] = c;

        m.setNodes( nodeCollection );

        expect( m.getStartNode() ).to.be.equal( a );
        expect( m.getFinishNode() ).to.be.equal( c );
    });

    it( 'it should have accurate setters and getters for dimensional size', () => {

        m = new Maze();
        let size: number[];

        m.setDimensions( [4, 3] );
        size = m.getDimensions();

        expect( size[0] ).to.be.equal( 4 );
        expect( size[1] ).to.be.equal( 3 );
    });

    it( 'it should report on the current amount of nodes included in the maze', () => {

        let mb: MazeBuilder = new MazeBuilder({});
        let maze: Maze = mb.buildMaze();

        let contents = maze.getNodes();

        expect( maze.getSize() ).to.be.equal( Object.keys( contents ).length );
    });

    it( 'has a working getter/setter for the current node pointer', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [2, 1] ));

        let nodeCollection: { [key:string] : MazeNode } = {};

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;
        nodeCollection[ c.getLocation().toString() ] = c;

        m.setNodes( nodeCollection );
        m.setCurrentNode( b );

        expect( m.getCurrentNode() ).to.be.equal( b );
    });

    it( 'facilitates traversal through cardinal movement', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );
        let d = new MazeNode( new Compass4() );
        let e = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] )).setName( "A" );
        b.setLocation( new NodeLocation2D( [1, 2] )).setName( "B" );
        c.setLocation( new NodeLocation2D( [2, 1] )).setName( "C" );
        d.setLocation( new NodeLocation2D( [2, 0] )).setName( "D" );
        e.setLocation( new NodeLocation2D( [0, 1] )).setName( "E" );

        a.connectTo( e, C4.N );
        a.connectTo( c, C4.E );
        a.connectTo( b, C4.S );
        b.connectTo( d, C4.W );

        nodeCollection[ a.id ] = a;
        nodeCollection[ b.id ] = b;
        nodeCollection[ c.id ] = c;
        nodeCollection[ d.id ] = d;
        nodeCollection[ e.id ] = e;

        m.setNodes( nodeCollection );
        m.setCurrentNode( a );

        expect( m.move( C4.N ) ).to.be.equal( e );
        expect( m.move( C4.S ) ).to.be.equal( a );
        expect( m.move( C4.E ) ).to.be.equal( c );
        expect( m.move( C4.W ) ).to.be.equal( a );
        expect( m.move( C4.S ) ).to.be.equal( b );
        expect( m.move( C4.W ) ).to.be.equal( d );
    });

    it( 'also returns maze nodes back as an array on demand', () => {
        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [1, 3] ));

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;

        m.setNodes( nodeCollection );

        let nodesArray = m.getNodesArray();

        expect( nodesArray.indexOf(a) ).to.not.be.equal( -1 );
        expect( nodesArray.indexOf(b) ).to.not.be.equal( -1 );
        expect( nodesArray.indexOf(c) ).to.be.equal( -1 );
    });

    it ( 'facilitates forEeach traversal by employing a callback function parameter', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        a.setName( a.getLocation().toString() );
        b.setLocation( new NodeLocation2D( [1, 2] ));
        b.setName( b.getLocation().toString() );
        c.setLocation( new NodeLocation2D( [1, 3] ));
        c.setName( c.getLocation().toString() );

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;

        m.setNodes( nodeCollection );

        let nodesArray: MazeNode[];
        let nodesNames: string[];
        nodesArray = [];
        nodesNames = [];
        m.forEachNode((node, key, nodes) => {
            nodesArray.push(node);
            nodesNames.push(key);
            expect(nodes).to.have.property(a.getLocation().toString());
            expect(nodes).to.have.property(b.getLocation().toString());
            expect(nodes).not.to.have.property(c.getLocation().toString());
        });

        expect( nodesArray ).to.have.lengthOf( 2 );
        expect( nodesNames ).to.have.lengthOf( 2 );
        expect( nodesArray.indexOf( a ) ).not.to.be.equal( -1 );
        expect( nodesArray.indexOf( b ) ).not.to.be.equal( -1 );
        expect( nodesArray.indexOf( c ) ).to.be.equal( -1 );

        expect( nodesNames.indexOf( a.getName() )).not.to.be.equal( -1 );
        expect( nodesNames.indexOf( b.getName() )).not.to.be.equal( -1 );
        expect( nodesNames.indexOf( c.getName() )).to.be.equal( -1 );
    });

    it ('can be translated into a valid JSON string', () => {

        let mb = new MazeBuilder();
        let maze = mb.buildMaze();

        expect (() => {JSON.stringify(maze)}).not.to.throw();
    });

    it ('should return a random node from the maze on demand', async () => {
    	let intervalTime = 10;
    	let idsCaptured: string[] = [];
    	let nodeTestCount = 50;
    	let duplicatesTolerance = Math.floor(nodeTestCount * 0.10);

    	let MB = new MazeBuilder();
    	let maze = MB.buildMaze();

    	let generateRandoms = async () => {
    		return new Promise((resolve) => {
				let timeoutsExecuted: number = 0;
				let interval = setInterval(() => {
					timeoutsExecuted++;
					idsCaptured.push(maze.getRandomNode().id);
					if (timeoutsExecuted > nodeTestCount) {
						clearInterval(interval);
						resolve();
					}
				}, intervalTime)
			})
		};

		await generateRandoms();

    	let currentId: string;
    	let matchesFound: number;
    	for (let i = 0 ; i < nodeTestCount ; i++) {
    		matchesFound = 0;
    		currentId = idsCaptured[i];
    		for (let j = 0 ; j < nodeTestCount ; j++) {
    			if (i === j) { continue; }
    			if (idsCaptured[i] === idsCaptured[j]) {
    				matchesFound++;
				}
			}
    		expect(matchesFound).to.be.lessThan(duplicatesTolerance);
		}
	});

    it ( 'provides a method to generate its node collection indexed by location key', () => {

        let mb = new MazeBuilder();
        let maze = mb.buildMaze();
        let nodes = maze.getNodes();
        let indexedNodes = maze.getLocationKeyIndex();
        let nodesWithNoLocationCount: number = 0;

        // Indexes and nodes should have contents
        expect(nodes).to.not.be.null;
        expect(indexedNodes).to.not.be.null;
        expect(indexedNodes.size).to.be.above(0);

        let node: MazeNode;
        let correspondingNode: MazeNode;
        let location: NodeLocation;
        let nodeId: string;

        // Crawling the maze nodes in order should give us nodes with the corresponding locations.
        // We'll also compare and delete each node from the nodes list as we encounter them via the index.
        // When we're done, all node pointers should point to null.
        for (let x = 0 ; x < maze.getDimensions()[0] ; x++) {
            for (let y = 0 ; y < maze.getDimensions()[1] ; y++) {

                node = indexedNodes.get(new NodeLocation2D([x, y]).toString());
                if (node === undefined) { continue; }
                location = node.getLocation();
                if ( location === null ) { continue; }
                correspondingNode = maze.getNodeAtLocation(location);

                if (correspondingNode.id.indexOf('EXIT-') === 0) { continue; }

                nodeId = node.id;

                expect(location.getPosition()[0]).to.be.equal(x);
                expect(location.getPosition()[1]).to.be.equal(y);
                expect(correspondingNode).to.be.equal(node);
                expect(maze.getNodeWithId(nodeId)).to.be.equal(node);

                nodes[nodeId] = null;
                expect(maze.getNodeWithId(nodeId)).to.be.null;
            }
        }

        maze.setNodes(nodes);
        // Go through the nodes list and make sure all entries were deleted from the list.
        Object.keys(maze.getNodes()).forEach((key) => {
        	let node = maze.getNodeWithId(key);
        	if (node && node.id.indexOf('EXIT-') === 0) { return; }
            expect(node).to.be.null;
        })
    })
});
