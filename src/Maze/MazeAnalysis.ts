import {MazeNode} from "../MazeNode";
import {Maze} from "../Maze";
import {NodeLocation2D} from "../MazeCoordinates/NodeLocation2D";

export class MazeAnalysis {

    /**
     * Structurs to store arrays of directional vacancies.  Indexes node ids based on the vacancies surrounding
     * a given node, organized by direction relative to the node in question.
     */
    private _nodeIdsWithVacantNeighborsInDirection: Map<number, string[]> = new Map<number, string[]>();
    private _nodeIdsWithNoVacantNeighborsInAnyDirection : string[];

    /**
     * The maze being analyzed.
     */
    private maze: Maze;
    private mazeLocationIndex:  Map<string, MazeNode>;
    private mazeCardinalityPoints: number;

    /**
     * Get a map of exit points => node ids
     * The exit points represent a point of cardinality, using the location Id string provided by NodeLocation as the key.
     * The array of strings is a list of ids for nodes which have a vacancy in the adjacent node in the indicated direction.
     * "Vacancy" means that there is no node in the maze at the position in question.
     */
    public get nodeIdsWithVacanciesAtDirection() : Map<number, string[]> {
        return this._nodeIdsWithVacantNeighborsInDirection;
    }

    /**
     * Get a map of node ids which do not have any adjacent vacancies.  These nodes are surrounded by other nodes.
     * "Vacancy" means that there is no node in the maze at the position in question.
     */
    public get nodeIdsWithNoVacantNeighborsInAnyDirection() : string[] {
        return this._nodeIdsWithNoVacantNeighborsInAnyDirection;
    }

    /**
     * @param maze {Maze}
     */
    constructor(maze: Maze) {
        this.maze = maze;
        this.mazeLocationIndex = this.maze.getLocationKeyIndex();
        this.mazeCardinalityPoints = this.maze.getCardinality().getConnectionPointCount();

        // Initialize arrays for directional neighbor vacancies
        for (let c = 0 ; c < this.mazeCardinalityPoints ; c++ ) {
            this._nodeIdsWithVacantNeighborsInDirection.set(c, []);
        }

        // Initialize array for no-directional neighbor vacancies
        this._nodeIdsWithNoVacantNeighborsInAnyDirection = [];

        this.analyzeMaze();
    }

    // maze Width, maze Height, Cardinality
    // O( w * h * c)
    /**
     * Analyze the maze so that all public reporting stats are accurate and available.
     */
    private analyzeMaze() {
        let node: MazeNode;
        let exitPointsTotal = this.maze.getCardinality().getConnectionPointCount();
        let vacantNodeNeighborFound: boolean = false;

        for ( let x = 0 ; x < this.maze.getDimensions()[0] ; x++ ) {
            for ( let y = 0 ; y < this.maze.getDimensions()[1]; y++ ) {

                vacantNodeNeighborFound = false;
                node = this.mazeLocationIndex.get(new NodeLocation2D([x, y]).toString());
                if (node != null) {
                    for( let exitPosition = 0 ; exitPosition < exitPointsTotal ; exitPosition++ ) {
                        if (this.neighborInDirectionIsVacant(exitPosition, node)) {
                            this._nodeIdsWithVacantNeighborsInDirection.get(exitPosition).push(node.getId());
                            vacantNodeNeighborFound = true;
                        }
                    }

                    if (!vacantNodeNeighborFound) {
                        this._nodeIdsWithNoVacantNeighborsInAnyDirection.push(node.getId());
                    }
                }
            }
        }
    }

    /**
     * Is the neighboring node position, relative to the given node in the given direction, vacant?
     *
     * @param exitIndex
     * @param node
     */
    private neighborInDirectionIsVacant(exitIndex: number, node: MazeNode): boolean {

        return  (typeof node.getNeighborIdAt(exitIndex) === 'undefined');
    }
}