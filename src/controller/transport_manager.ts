import { Vehicle } from '../model/vehicles/vehicle';
import { GameMap } from "../model/map"
import { Navigator } from "../model/navigator"
import { BusStop } from "../model/points/bus_stop_point"
import { Entertainment } from "../model/points/entertainment_point"
import { GasStation } from "../model/points/gas_station_point"
import { Point } from "../model/points/point"
import { Warehouse } from "../model/points/warehouse_point"
import { Bus } from '../model/vehicles/bus';
import { Truck } from '../model/vehicles/truck';

export type Points = BusStop | GasStation | Warehouse | Point | Entertainment
export type Vehicles = Vehicle | Bus | Truck // | Bike 

export function random(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1) + min) }

export class Manager {
    #vehicles: Vehicles[] = []
    navigator: Navigator = new Navigator(new GameMap([], []))

    constructor(points?: Points[], map?: GameMap, vehicles?: Vehicles[]) {
        if (map && points) { this.navigator = new Navigator(map) }
        if (vehicles) this.#vehicles = vehicles
    }

    addPoint(point: Points) {
        this.navigator.addPoint(point)
    }

    addRoute(from: number, to: number, speedLimit: number, trucksAllowed: boolean) {
        if (from < 0 || to < 0 || from >= this.navigator.points.length || to >= this.navigator.points.length)
            throw new Error("(Manager) Invalid index of point in route creation")

        this.navigator.addRoute(from, to, speedLimit, trucksAllowed)
    }

    addVehicle(vehicle: Vehicles) { this.#vehicles.push(vehicle) }

    setConfiguration(w: number, h: number) {
        this.navigator = new Navigator(new GameMap([], []))
        this.#vehicles = []

        this.#clear()
        this.#defaultMap(w, h)
    }

    #clear(){
        Point.reset()
        this.#vehicles = []
        this.navigator = new Navigator(new GameMap([], []))
    }

    #defaultMap(maxW: number, maxH: number) {
        this.addPoint(new BusStop(maxW * 0.1, maxH * 0.1, 5, 30, 5000))
        this.addPoint(new Warehouse(maxW * 0.1, maxH * 0.9, 5, random(10000, 50000)))
        this.addPoint(new GasStation(maxW * 0.15, maxH * 0.55, 5, 10, 2000))

        this.addRoute(0, 2, 100, false);
        this.addRoute(1, 2, 100,true);

        this.addPoint(new Entertainment(maxW * 0.3, maxH * 0.7, 5, random(3000, 10000)))
        this.addRoute(3, 2, 100, false);

        this.addPoint(new Warehouse(maxW * 0.35, maxH * 0.2, 5, random(10000, 50000)))
        this.addRoute(3, 4, 100,false);
        this.addRoute(0, 4, 100, false);

        this.addPoint(new BusStop(maxW * 0.6, maxH * 0.4, 5, 20, 3000))
        this.addRoute(4, 5, 100,true);
        this.addRoute(3, 5, 100,true);

        this.addPoint(new GasStation(maxW * 0.9, maxH * 0.1, 5, 5, 1000))
        this.addRoute(4, 6, 100,true);

        this.addPoint(new Entertainment(maxW * 0.6, maxH * 0.7, 5, random(1000, 5000)))
        this.addRoute(5, 7, 100,true);
        this.addRoute(6, 7, 100,true);

        this.addPoint(new BusStop(maxW * 0.9, maxH * 0.9, 5, 50, 10000))
        this.addRoute(1, 8, 100,true);
        this.addRoute(7, 8, 100,true);
        this.addRoute(6, 8, 100,true);
    }


    get map() { return this.navigator.map }
    get points() { return this.navigator.points }
    get vehicles() { return this.#vehicles }

    update() { this.#vehicles.forEach(v => v.update()) }
}
