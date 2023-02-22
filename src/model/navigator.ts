import { GameMap } from './map';
import { Points } from "../controller/transport_manager";

import { Stack } from './ds/stack';
import { Queue } from './ds/queue';

interface Edge {
    from: number;
    to: number;
}

export class Navigator {
    #map: GameMap

    #pointIds: Map<number, Points>;

    constructor(map: GameMap) {
        this.#map = map

        this.#pointIds = new Map<number, Points>();

        // Point id = <number>_<number>
        // Keys for actual points => <number><number>
        this.#map.points.forEach(point => {
            this.#pointIds.set(Number(String(point.id.at(0)) + String(point.id.at(2))), point);
        });
    }

    public findRoute(startPoint: Points, endPoint: Points): Points[] {
        let start = Number(startPoint.id[0]);
        let end = Number(endPoint.id[0]);
    
        let queue = new Queue<number>();
        let edges = new Stack<Edge>();
        let route = new Array<number>();
        let nodes = new Array(this.#map.size).fill(0);
    
        queue.enqueue(start);
        while (queue.size()) {
            let curr_node = queue.dequeue();
            let edge: Edge = { from: 0, to: 0 };
    
            if (curr_node) nodes[curr_node] = 2;
            for (let i = 0; i < this.#map.size; i++) {
                if (curr_node != undefined && (this.#map.map[curr_node][i] === 1) && nodes[i] === 0) {
                    queue.enqueue(i);
                    nodes[i] = 1;
    
                    edge.from = curr_node;
                    edge.to = i;
                    edges.push(edge);
    
                    if (curr_node === end) break;
                }
            }
        }
    
        while (edges.size()) {
            let edge = edges.pop();
    
            if (edge?.to === end) {
                end = edge.from;
                route.push(end + 1);
            }
        }
    
        route = route.reverse();
    
        let points: Points[] = [];
    
        route.forEach(element => {
            let elem = undefined
            this.#map.points.forEach(point => { if (Number(point.id[0]) === element) elem = point })
            if (elem) points.push(elem);
        });
    
        return points;
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

    get points() { return this.#map.points }
    get map() { return this.#map }
}