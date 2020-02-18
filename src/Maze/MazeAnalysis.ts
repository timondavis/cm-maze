import {MazeNode} from "../MazeNode";
import {Maze} from "../Maze";
import {NodeLocation2D} from "../MazeCoordinates/NodeLocation2D";

export interface IMazeAnalysis {
	nodeIdsAdjacentToBorderAtExitPoint: Map<number, string[]>;
	maze: Maze;
	mazeLocationIndex:  Map<string, MazeNode>;
	mazeCardinalityPoints: number;
}

export class MazeAnalysis {

	protected state: IMazeAnalysis;

    public get nodeIdsAdjacentToBorderAtExitPoint() : Map<number, string[]> {
        return this._nodeIdsAdjacentToBorderAtExitPoint;
    }

    /**
     * @param maze {Maze}
     */
    constructor(maze: Maze) {

    	this.state = {
			maze: maze,
			mazeCardinalityPoints: maze.getCardinality().getConnectionPointCount(),
			mazeLocationIndex: maze.getLocationKeyIndex(),
			nodeIdsAdjacentToBorderAtExitPoint:  new Map<number, string[]>(),
		};

        // Initialize arrays for directional neighbor vacancies
        for (let c = 0 ; c < this.state.mazeCardinalityPoints ; c++ ) {
            this.state.nodeIdsAdjacentToBorderAtExitPoint.set(c, []);
        }

        this.analyzeMaze();
    }

    /**
     * Analyze the maze so that all public reporting stats are accurate and available.
     */
    private analyzeMaze() {
		this.scanNodesWithVacantNeighbors();
    }

    private scanNodesWithVacantNeighbors() {
		let node: MazeNode;

		for ( let x = 0 ; x < this.maze.getDimensions()[0] ; x++ ) {

			for ( let y = 0 ; y < this.maze.getDimensions()[1]; y++ ) {
				node = this.mazeLocationIndex.get(new NodeLocation2D([x, y]).toString());
				if (node != null) {
					this._nodeIdsAdjacentToBorderAtExitPoint.get(0).push(node.id);
					break;
				}
			}

			for (let y = this.maze.getDimensions()[1] - 1 ; y >= 0 ; y--) {
				node = this.mazeLocationIndex.get(new NodeLocation2D([x, y]).toString());
				if (node != null) {
					this._nodeIdsAdjacentToBorderAtExitPoint.get(this.maze.getCardinality().getConnectionPointCount() * 0.5).push(node.id);
					break;
				}
			}
		}

		for (let y = 0 ; y < this.maze.getDimensions()[1] ; y++) {

			for (let x = 0 ; x < this.maze.getDimensions()[0] ; x++){
				node = this.mazeLocationIndex.get(new NodeLocation2D([x,y]).toString());
				if (node != null) {
					this._nodeIdsAdjacentToBorderAtExitPoint.get(this.maze.getCardinality().getConnectionPointCount() * 0.75).push(node.id);
					break;
				}
			}

			for (let x = this.maze.getDimensions()[0] ; x >= 0 ; x-- ) {
				node = this.mazeLocationIndex.get(new NodeLocation2D([x,y]).toString());
				if (node != null) {
					this._nodeIdsAdjacentToBorderAtExitPoint.get(this.maze.getCardinality().getConnectionPointCount() * 0.25).push(node.id);
					break;
				}
			}
		}
	}
}