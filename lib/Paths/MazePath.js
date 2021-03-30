"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazePath = void 0;
class MazePath {
    constructor() {
        MazePath.pathIdCounter++;
        this.state = {
            firstNodeId: "",
            lastNodeId: "",
            path: [],
            pathId: MazePath.pathIdCounter,
            pointerIndex: -1
        };
    }
    get id() {
        return this.state.pathId;
    }
    first() {
        return this.state.firstNodeId;
    }
    last() {
        return this.state.lastNodeId;
    }
    reset() {
        this.state.pointerIndex = 0;
    }
    next() {
        if (this.state.pointerIndex + 1 < this.state.path.length) {
            this.state.pointerIndex++;
        }
        else {
            return null;
        }
        return this.state.path[this.state.pointerIndex];
    }
    current() {
        if (this.state.pointerIndex < this.state.path.length) {
            return this.state.path[this.state.pointerIndex];
        }
    }
    append(nodeId) {
        if (this.state.path.length === 0) {
            this.state.firstNodeId = this.state.lastNodeId = nodeId;
        }
        else {
            this.state.lastNodeId = nodeId;
        }
        this.state.path.push(nodeId);
    }
    get length() {
        return this.state.path.length;
    }
    toIdArray() {
        if (this.state.path.length === 0) {
            return [];
        }
        let tempPointerIndex = 0;
        let idArray = [];
        while (tempPointerIndex < this.state.path.length) {
            idArray.push(this.state.path[tempPointerIndex]);
            tempPointerIndex++;
        }
        return idArray;
    }
    toMazeNodeArray(maze) {
        if (this.state.path.length === 0) {
            return [];
        }
        let tempPointerIndex = 0;
        let nodeArray = [];
        while (tempPointerIndex < this.state.path.length) {
            nodeArray.push(maze.getNodeWithId(this.state.path[tempPointerIndex]));
            tempPointerIndex++;
        }
        return nodeArray;
    }
}
exports.MazePath = MazePath;
MazePath.pathIdCounter = 0;
