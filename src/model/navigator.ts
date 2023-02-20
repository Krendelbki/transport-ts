import { GameMap } from './map';
import { Points } from "../controller/transport_manager";

interface Edge {
    from: number;
    to: number;
}

export class Navigator {
    #map: GameMap

    constructor(map: GameMap) {
        this.#map = map
    }

    public static findRoute(startPoint: Points | undefined, endPoint: Points | undefined): Points[] {
        if (!startPoint || !endPoint) return []
        // Todo
        return [endPoint]
    }

    // Returns nearest gas station point from Points[]
    public static findGasStation(startPoint: Points | undefined): Points | undefined {
        if (!startPoint) return undefined
        // Todo
        return startPoint
    }

    addPoint(point: Points) {
        this.#map.addPoint(point)
    }

    addRoute(from: number, to: number) {
        this.#map.addRoute(from, to)
    }

    get points () { return this.#map.points }
    get map () { return this.#map }
}