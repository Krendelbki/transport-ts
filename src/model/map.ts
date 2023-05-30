import { Points } from "../controller/transport_manager";
import { Route } from "./route";

export class GameMap {
    #map: Route[][] = [];
    #points: Points[] = [];
    #ids: number[] = [];

    get size() { return this.#map.length }

    constructor(map: Route[][], points: Points[]) {
        this.#map = map;
        this.#points = points;

        this.#points.forEach(point => {
            this.#ids.push(Number(String(point.id.split('_')[1]) + String(point.id.split('_')[1])));
        });
    }

    get map() { return this.#map }

    addPoint(point: Points) {
        const row = Array<Route>(this.size + 1).fill(new Route(false, 0, 60, true));

        this.#map.forEach(row => row.push(new Route(false,0, 60,true)));
        this.#map.push(row);

        this.#points.push(point);
    }

    addRoute(from: number, to: number, speedLimit: number, trucksAllowed: boolean) {
        const startPoint = this.#points[from]
        const endPoint = this.#points[to]

        const dx = endPoint.x - startPoint.x
        const dy = endPoint.y - startPoint.y

        const length = Math.floor(Math.sqrt(dx * dx + dy * dy) * 100) / 100

        const route = new Route(true, length, speedLimit, trucksAllowed)
        this.#map[from][to] = route;
        this.#map[to][from] = route;
    }

    checkRoute(start: Points, end: Points): boolean {
        let start_index = 0, end_index = 0;
        let i = 0;
        this.points.forEach(point => {
            if (+point.id.split('_')[1] === +start.id.split('_')[1]) {
                start_index = i;
            }
            if (+point.id.split('_')[1] === +end.id.split('_')[1]) {
                end_index = i;
            }
            ++i
        })

        return this.#map[start_index][end_index].length !== 0;
    }

    get points() { return this.#points }
}