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

    getPointByIndex(index: number): Points | undefined {
        let count = 0;
        this.#points.forEach(point => {
            if (count === index) {
                return point
            }
            count++;
        });
        return
    }

    getPointIndex(_point: Points): number | undefined {
        let count: number = 0;
        this.#points.forEach(point => {
            if (point === _point) return count;
            count++;
        });
        return
    }

    addRoute(from: number, to: number) {
        this.#map[from][to] = 1;
    }

    get points() { return this.#points }
}