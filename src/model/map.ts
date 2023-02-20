import { Points } from "../controller/transport_manager";

export class GameMap {
    #map: number[][] = [];
    #points: Points[] = [];

    get size() { return this.#map.length }

    constructor(map: number[][], points: Points[]) {
        this.#map = map;
        this.#points = points;
    }

    get map() { return this.#map }

    addPoint(point: Points) {
        const row = Array<number>(this.size + 1).fill(0);

        this.#map.forEach(row => row.push(0));
        this.#map.push(row);

        this.#points.push(point);
    }

    addRoute(from: number, to: number) {
        this.#map[from][to] = 1;
    }

    get points() { return this.#points }
}