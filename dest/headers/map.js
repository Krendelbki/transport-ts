"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
class GameMap {
    constructor(size, map) {
        this.size = 0;
        this.map = [];
        this.size = size;
        this.map = map;
    }
    get_size() {
        return this.size;
    }
    get_map() {
        return this.map;
    }
    set_map(map) {
        this.map = map;
        this.size = countSize(map);
        return this;
    }
}
exports.GameMap = GameMap;
function countSize(arr) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        counter++;
    }
    return counter;
}
