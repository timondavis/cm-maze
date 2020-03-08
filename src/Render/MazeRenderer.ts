import {Maze} from "../Maze/Maze";
import {NodeLocation2D} from "../MazeCoordinates/NodeLocation2D";
import {MazeNode} from "../Maze/MazeNode";
export class MazeRenderer {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public maze : Maze;
    public canvasDimensions: number[] = [];

    public constructor( canvasElementId : string, maze : Maze, dimensions: number = 2 ) {

        this.canvas = <HTMLCanvasElement>document.getElementById( canvasElementId );

        if ( dimensions == 2 ) {

            this.context = <CanvasRenderingContext2D> this.canvas.getContext( "2d" );
        } else {
            throw( "Canvas rendering only supports 2 dimensional mazes at this time." );
        }
        this.maze = maze;

        this.canvasDimensions.push( this.canvas.width );
        this.canvasDimensions.push( this.canvas.height );
    }

    public render2D() {

        console.log( "rendering" );

        if ( this.maze.getDimensions().length != 2 ) { throw "Cannot render non-2d model in 2d"; }

        let context = this.context;
        let X: number = 0;
        let Y: number = 1;
        let gridUnitWidthPx = Math.floor( this.canvasDimensions[X] / this.maze.getDimensions()[X] );
        let gridUnitHeightPx = Math.floor( this.canvasDimensions[Y] / this.maze.getDimensions()[Y] );

        let nodeRadiusPx: number = 0;
        let nodeCenterX: number = 0;
        let nodeCenterY: number = 0;

        let neighborNodeCenterX: number = 0;
        let neighborNodeCenterY: number = 0;

        let cardinality: number;

        let lineOriginX: number = 0;
        let lineOriginY: number = 0;
        let lineDestinationX: number = 0;
        let lineDestinationY: number = 0;

        if ( gridUnitWidthPx >= gridUnitHeightPx ) {
            nodeRadiusPx = (gridUnitHeightPx * 0.75) / 2;
        } else {
            nodeRadiusPx = (gridUnitWidthPx * 0.75) / 2;
        }


        nodeRadiusPx = Math.min( 100, nodeRadiusPx );

        context.fillStyle = "#ffffff";
        context.fillRect( 0, 0, this.canvas.width - 5, this.canvas.height - 5 );


        context.textBaseline = "top";

        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";
        context.lineWidth = 1;

        for ( let x = 0 ; x < this.maze.getDimensions()[X] ; x++ ) {

            for ( let y = 0 ; y < this.maze.getDimensions()[Y] ; y++ ) {


                let node = this.maze.getNodeAtLocation( new NodeLocation2D( [ x, y ] ) );
                let neighborNode: MazeNode;

                if ( typeof node === 'undefined' ) { continue; }

                if ( node.location === this.maze.getStartNode().location ) {

                    context.fillStyle = "#00FF00";
                    context.strokeStyle = "#00FF00";
                } else if ( this.maze.getFinishNode() && node.location === (<MazeNode> this.maze.getFinishNode()).location ) {

                    context.fillStyle = "#0000FF";
                    context.strokeStyle = "#0000FF";

                } else {

                    context.strokeStyle = "#000000";
                    context.fillStyle = "#FFFFFF";
                }


                nodeCenterX = ( gridUnitWidthPx * x + ( gridUnitWidthPx * 0.5 ) );
                nodeCenterY = ( gridUnitHeightPx * y + ( gridUnitHeightPx * 0.5 ) );

                context.beginPath();
                context.arc( nodeCenterX, nodeCenterY, nodeRadiusPx,(Math.PI/180)* 0, (Math.PI/180) * 360, false );
                context.fill();
                context.stroke();
                context.closePath();

                cardinality = node.cardinality.getConnectionPointCount();

                for ( let i = 0 ; i < cardinality ; i++ ) {

                    context.strokeStyle = "#ff0000";
                    context.fillStyle = "#ff0000";

                    if ( ! node.isConnectionPointOccupied(i) ) { continue; }

                    lineOriginX = nodeCenterX +
                        Math.cos( (Math.PI/180) * ( ( i / cardinality * 360 ) - 90 ) ) * nodeRadiusPx;
                    lineOriginY = nodeCenterY +
                        Math.sin( (Math.PI/180) * ( ( i / cardinality * 360 ) - 90 ) ) * nodeRadiusPx;

                    let neighborNodeId = node.getNeighborIdAt(i);
                    neighborNode = this.maze.getNodeWithId(neighborNodeId);
                    let neighborCoordinates = neighborNode.location.position;

                    neighborNodeCenterX = ( gridUnitWidthPx * neighborCoordinates[X] + ( gridUnitWidthPx * 0.5 ) );
                    neighborNodeCenterY = ( gridUnitHeightPx * neighborCoordinates[Y] + ( gridUnitHeightPx * 0.5 ) );

                    lineDestinationX = neighborNodeCenterX +
                        Math.cos( (Math.PI/180) * (( neighborNode.cardinality.getOpposingConnectionPoint(i) / neighborNode.cardinality.getConnectionPointCount() * 360 ) - 90 ) ) * nodeRadiusPx;
                    lineDestinationY = neighborNodeCenterY +
                        Math.sin( (Math.PI/180) * (( neighborNode.cardinality.getOpposingConnectionPoint(i) / neighborNode.cardinality.getConnectionPointCount() * 360 ) - 90 ) ) * nodeRadiusPx;

                    context.beginPath();
                    context.moveTo( lineOriginX, lineOriginY );
                    context.lineTo( lineDestinationX, lineDestinationY );
                    context.stroke();

                    context.closePath();
                }
            }
        }
    }
}