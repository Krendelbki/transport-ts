import { GameMap } from "./map";

interface Edge {
    from: number;
    to: number;
}

export class Navigator {
    private map: GameMap;
    
    constructor (map: GameMap) {
        this.map = map;
    } 

    public set_map(map: GameMap) {
        this.map = map;
    }

    public findRoute(startPoint: number, endPoint: number) : number[] {
        // Todo
        return [];
    }
}