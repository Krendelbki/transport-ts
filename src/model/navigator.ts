import { GameMap } from './map';
import { Points } from "../controller/transport_manager";

export class Navigator {
    #map: GameMap

    constructor(map: GameMap) {
        this.#map = map
    }

    public findRoute(startPoint: Points, endPoint: Points, speed: number, isTruck: boolean): Points[] {
        const start = Number(startPoint?.id.split('_')[1]);
        const end = Number(endPoint?.id.split('_')[1]);

        const len = this.#map.size;
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
                if ((graph[minNode][j].length !== 0)
                    && !visited[j]
                    && ((isTruck && graph[minNode][j].trucksAllowed) || !isTruck)
                )
                { // if there is an edge and the node is not visited
                    const distance = distances[minNode] + graph[minNode][j].length;
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
        path.forEach(path_id => {
            this.#map.points.forEach(point => {
                let point_id = Number(point.id.split('_')[1])
                if (path_id === point_id) {
                    points.push(point);
                }
            });
        });

        if (points.length === 1) return [] 
        
        return points;
    }


    // Returns nearest gas station point from Points[]
    public findGasStation(startPoint: Points | undefined, speed: number, isTruck: boolean): Points | undefined {
        const start = Number(startPoint?.id.split('_')[1]);

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
                if (Number(point.id.split('_')[1]) === minNode && point.type === 2 && this.#map.checkRoute(startPoint!, point)) {
                    return point;
                }
            }

            // update distances of adjacent nodes if a shorter path is found
            for (let j = 0; j < len; j++) {
                if ((graph[minNode][j].length !== 0 && graph[j][minNode].length !== 0)
                    && !visited[j]
                    && ((isTruck && graph[minNode][j].trucksAllowed) || !isTruck)
                ) { // if there is an edge and the node is not visited
                    const distance = distances[minNode] + graph[minNode][j].length;
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

    addRoad(from: number, to: number, speedLimit: number, trucksAllowed: boolean) {
        this.#map.addRoad(from, to, speedLimit, trucksAllowed);
    }

    get map() { return this.#map }
}