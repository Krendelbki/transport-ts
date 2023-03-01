import { Points } from "../controller/transport_manager";

export class GameMap {
    #map: number[][] = [];
    #points: Points[] = [];
    #ids: number[] = [];

    get size() { return this.#map.length }

    constructor(map: number[][], points: Points[]) {
        this.#map = map;
        this.#points = points;

        this.#points.forEach(point => {
            this.#ids.push(Number(String(point.id.at(0)) + String(point.id.at(2))));
        });
    }

    get map() { return this.#map }

    addPoint(point: Points) {
        const row = Array<number>(this.size + 1).fill(0);

        this.#map.forEach(row => row.push(0));
        this.#map.push(row);

        this.#points.push(point);
    }

    addRoute(from: number, to: number) {
        const startPoint = this.#points[from]
        const endPoint = this.#points[to]

        const dx = endPoint.x - startPoint.x
        const dy = endPoint.y - startPoint.y

        const length = Math.floor(Math.sqrt(dx * dx + dy * dy) * 100) / 100
        this.#map[from][to] = length;
    }

    get points() { return this.#points }
}