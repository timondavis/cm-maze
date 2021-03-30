"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeRenderer = void 0;
const NodeLocation2D_1 = require("../MazeCoordinates/NodeLocation2D");
class MazeRenderer {
    constructor(canvasElementId, maze, dimensions = 2) {
        this.canvasDimensions = [];
        this.canvas = document.getElementById(canvasElementId);
        if (dimensions == 2) {
            this.context = this.canvas.getContext("2d");
        }
        else {
            throw ("Canvas rendering only supports 2 dimensional mazes at this time.");
        }
        this.maze = maze;
        this.canvasDimensions.push(this.canvas.width);
        this.canvasDimensions.push(this.canvas.height);
    }
    render2D() {
        console.log("rendering");
        if (this.maze.getDimensions().length != 2) {
            throw "Cannot render non-2d model in 2d";
        }
        let context = this.context;
        let X = 0;
        let Y = 1;
        let gridUnitWidthPx = Math.floor(this.canvasDimensions[X] / this.maze.getDimensions()[X]);
        let gridUnitHeightPx = Math.floor(this.canvasDimensions[Y] / this.maze.getDimensions()[Y]);
        let nodeRadiusPx = 0;
        let nodeCenterX = 0;
        let nodeCenterY = 0;
        let neighborNodeCenterX = 0;
        let neighborNodeCenterY = 0;
        let cardinality;
        let lineOriginX = 0;
        let lineOriginY = 0;
        let lineDestinationX = 0;
        let lineDestinationY = 0;
        if (gridUnitWidthPx >= gridUnitHeightPx) {
            nodeRadiusPx = (gridUnitHeightPx * 0.75) / 2;
        }
        else {
            nodeRadiusPx = (gridUnitWidthPx * 0.75) / 2;
        }
        nodeRadiusPx = Math.min(100, nodeRadiusPx);
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, this.canvas.width - 5, this.canvas.height - 5);
        context.textBaseline = "top";
        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
        for (let x = 0; x < this.maze.getDimensions()[X]; x++) {
            for (let y = 0; y < this.maze.getDimensions()[Y]; y++) {
                let node = this.maze.getNodeAtLocation(new NodeLocation2D_1.NodeLocation2D([x, y]));
                let neighborNode;
                if (typeof node === 'undefined') {
                    continue;
                }
                if (node.location === this.maze.getStartNode().location) {
                    context.fillStyle = "#00FF00";
                    context.strokeStyle = "#00FF00";
                }
                else if (this.maze.getFinishNode() && node.location === this.maze.getFinishNode().location) {
                    context.fillStyle = "#0000FF";
                    context.strokeStyle = "#0000FF";
                }
                else {
                    context.strokeStyle = "#000000";
                    context.fillStyle = "#FFFFFF";
                }
                nodeCenterX = (gridUnitWidthPx * x + (gridUnitWidthPx * 0.5));
                nodeCenterY = (gridUnitHeightPx * y + (gridUnitHeightPx * 0.5));
                context.beginPath();
                context.arc(nodeCenterX, nodeCenterY, nodeRadiusPx, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
                context.fill();
                context.stroke();
                context.closePath();
                cardinality = node.cardinality.getConnectionPointCount();
                for (let i = 0; i < cardinality; i++) {
                    context.strokeStyle = "#ff0000";
                    context.fillStyle = "#ff0000";
                    if (!node.isConnectionPointOccupied(i)) {
                        continue;
                    }
                    lineOriginX = nodeCenterX +
                        Math.cos((Math.PI / 180) * ((i / cardinality * 360) - 90)) * nodeRadiusPx;
                    lineOriginY = nodeCenterY +
                        Math.sin((Math.PI / 180) * ((i / cardinality * 360) - 90)) * nodeRadiusPx;
                    let neighborNodeId = node.getNeighborIdAt(i);
                    neighborNode = this.maze.getNodeWithId(neighborNodeId);
                    let neighborCoordinates = neighborNode.location.position;
                    neighborNodeCenterX = (gridUnitWidthPx * neighborCoordinates[X] + (gridUnitWidthPx * 0.5));
                    neighborNodeCenterY = (gridUnitHeightPx * neighborCoordinates[Y] + (gridUnitHeightPx * 0.5));
                    lineDestinationX = neighborNodeCenterX +
                        Math.cos((Math.PI / 180) * ((neighborNode.cardinality.getOpposingConnectionPoint(i) / neighborNode.cardinality.getConnectionPointCount() * 360) - 90)) * nodeRadiusPx;
                    lineDestinationY = neighborNodeCenterY +
                        Math.sin((Math.PI / 180) * ((neighborNode.cardinality.getOpposingConnectionPoint(i) / neighborNode.cardinality.getConnectionPointCount() * 360) - 90)) * nodeRadiusPx;
                    context.beginPath();
                    context.moveTo(lineOriginX, lineOriginY);
                    context.lineTo(lineDestinationX, lineDestinationY);
                    context.stroke();
                    context.closePath();
                }
            }
        }
    }
}
exports.MazeRenderer = MazeRenderer;
