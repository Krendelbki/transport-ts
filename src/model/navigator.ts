import { GameMap } from './map';
import { Points } from "../controller/transport_manager";

export class Navigator {
    #map: GameMap

    constructor(map: GameMap) {
        this.#map = map
    }

    public findRoute(startPoint: Points, endPoint: Points): Points[] {
        const start = Number(startPoint.id.at(0));
        const end = Number(endPoint.id.at(0));

        const len = this.#map.size; // number of nodes in the graph
        const graph = this.#map.map; // graph to work on

        const distances = new Array<number>(len).fill(Infinity); // initialize distances to infinity
        const visited = new Array<boolean>(len).fill(false); // initialize visited flags to false
        const prevNodes = new Array<number>(len).fill(-1); // initialize previous nodes to -1

        distances[start] = 0; // distance from start node to itself is 0

        while (!visited[end]) { // repeat until the end node is visited
            let minDistance = Infinity;
            let minNode = -1;

            // find the node with minimum distance
            for (let i = 0; i < len; i++) {
                if (!visited[i] && distances[i] <= minDistance) {
                    minDistance = distances[i];
                    minNode = i;
                }
            }

            visited[minNode] = true; // mark the node as visited

            // update distances of adjacent nodes if a shorter path is found
            for (let j = 0; j < len; j++) {
                if (graph[minNode][j] != 0 && !visited[j]) { // if there is an edge and the node is not visited
                    const distance = distances[minNode] + graph[minNode][j];
                    if (distance < distances[j]) {
                        distances[j] = distance;
                        prevNodes[j] = minNode;
                    }
                }
            }
        }

        // construct the path from start to end node
        const path: number[] = [];
        let currentNode = end;
        while (currentNode !== -1) {
            path.unshift(currentNode);
            currentNode = prevNodes[currentNode];
        }

        // construct the points array from path
        const points: Points[] = [];
        path.forEach(id => {
            this.#map.points.forEach(point => {
                if (id === Number(point.id.at(0))) {
                    points.push(point);
                }
            });
        });
        return points;
    }


    // Returns nearest gas station point from Points[]
    public findGasStation(startPoint: Points | undefined): Points | undefined {
        const start = Number(startPoint?.id.at(0));

        const len = this.#map.size // number of nodes in the graph
        const graph = this.#map.map; // graph to work on

        const distances = new Array<number>(len).fill(Infinity); // initialize distances to infinity
        const visited = new Array<boolean>(len).fill(false); // initialize visited flags to false
        const prevNodes = new Array<number>(len).fill(-1); // initialize previous nodes to -1

        distances[start] = 0; // distance from start node to itself is 0

        while (true) { // repeat until the end node is visited
            let minDistance = Infinity;
            let minNode = -1;

            // find the node with minimum distance
            for (let i = 0; i < len; i++) {
                if (!visited[i] && distances[i] <= minDistance) {
                    minDistance = distances[i];
                    minNode = i;
                }
            }

            if (minNode === -1) return undefined;

            // mark the node as visited
            visited[minNode] = true;

            for (const point of this.#map.points) {
                if (Number(point.id.at(0)) === minNode && point.type === 2) {
                    return point;
                }
            }

            // update distances of adjacent nodes if a shorter path is found
            for (let j = 0; j < len; j++) {
                if (graph[minNode][j] != 0 && !visited[j]) { // if there is an edge and the node is not visited
                    const distance = distances[minNode] + graph[minNode][j];
                    if (distance < distances[j]) {
                        distances[j] = distance;
                        prevNodes[j] = minNode;
                    }
                }
            }
        }
    }

    addPoint(point: Points) {
        this.#map.addPoint(point)
    }

    addRoute(from: number, to: number) {
        this.#map.addRoute(from, to)
    }

    get points() { return this.#map.points }
    get map() { return this.#map }
}