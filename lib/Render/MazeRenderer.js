"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeLocation2D_1 = require("../MazeCoordinates/NodeLocation2D");
var MazeRenderer = /** @class */ (function () {
    function MazeRenderer(canvasElementId, maze, dimensions) {
        if (dimensions === void 0) { dimensions = 2; }
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
    MazeRenderer.prototype.render2D = function () {
        console.log("rendering");
        if (this.maze.getDimensions().length != 2) {
            throw "Cannot render non-2d model in 2d";
        }
        var context = this.context;
        var X = 0;
        var Y = 1;
        var gridUnitWidthPx = Math.floor(this.canvasDimensions[X] / this.maze.getDimensions()[X]);
        var gridUnitHeightPx = Math.floor(this.canvasDimensions[Y] / this.maze.getDimensions()[Y]);
        var nodeRadiusPx = 0;
        var nodeCenterX = 0;
        var nodeCenterY = 0;
        var neighborNodeCenterX = 0;
        var neighborNodeCenterY = 0;
        var cardinality;
        var lineOriginX = 0;
        var lineOriginY = 0;
        var lineDestinationX = 0;
        var lineDestinationY = 0;
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
        for (var x = 0; x < this.maze.getDimensions()[X]; x++) {
            for (var y = 0; y < this.maze.getDimensions()[Y]; y++) {
                var node = this.maze.getNode(new NodeLocation2D_1.NodeLocation2D([x, y]));
                var neighborNode = void 0;
                if (typeof node === 'undefined') {
                    continue;
                }
                if (node.getLocation() === this.maze.getStartNode().getLocation()) {
                    context.fillStyle = "#00FF00";
                    context.strokeStyle = "#00FF00";
                }
                else if (this.maze.getFinishNode() && node.getLocation() === this.maze.getFinishNode().getLocation()) {
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
                /*                context.font = "15px Sans-Serif";
                                context.fillText( node.getName(), nodeCenterX - (5 * node.getName().length ), nodeCenterY - (0.25 * nodeRadiusPx) );
                
                                context.font = "11px Sans-Serif";
                                context.fillText( node.getCoordinates().toString(), nodeCenterX - ( ( node.getCoordinates().toString().length / 2 ) * 5 ) , nodeCenterY + ( 0.15 * nodeRadiusPx ) );
                                */
                cardinality = node.getCardinality().getConnectionPointCount();
                for (var i = 0; i < cardinality; i++) {
                    context.strokeStyle = "#ff0000";
                    context.fillStyle = "#ff0000";
                    if (!node.isConnectionPointOccupied(i)) {
                        continue;
                    }
                    lineOriginX = nodeCenterX +
                        Math.cos((Math.PI / 180) * ((i / cardinality * 360) - 90)) * nodeRadiusPx;
                    lineOriginY = nodeCenterY +
                        Math.sin((Math.PI / 180) * ((i / cardinality * 360) - 90)) * nodeRadiusPx;
                    neighborNode = node.getNeighborAt(i);
                    var neighborCoordinates = neighborNode.getLocation().getPosition();
                    neighborNodeCenterX = (gridUnitWidthPx * neighborCoordinates[X] + (gridUnitWidthPx * 0.5));
                    neighborNodeCenterY = (gridUnitHeightPx * neighborCoordinates[Y] + (gridUnitHeightPx * 0.5));
                    lineDestinationX = neighborNodeCenterX +
                        Math.cos((Math.PI / 180) * ((neighborNode.getCardinality().getOpposingConnectionPoint(i) / neighborNode.getCardinality().getConnectionPointCount() * 360) - 90)) * nodeRadiusPx;
                    lineDestinationY = neighborNodeCenterY +
                        Math.sin((Math.PI / 180) * ((neighborNode.getCardinality().getOpposingConnectionPoint(i) / neighborNode.getCardinality().getConnectionPointCount() * 360) - 90)) * nodeRadiusPx;
                    context.beginPath();
                    context.moveTo(lineOriginX, lineOriginY);
                    context.lineTo(lineDestinationX, lineDestinationY);
                    context.stroke();
                    context.closePath();
                }
            }
        }
    };
    return MazeRenderer;
}());
exports.MazeRenderer = MazeRenderer;
