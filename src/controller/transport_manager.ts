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

export const ManagerConfiguration = {
    Default: { key: "default", name: "Авто" },
    Bus: { key: "bus", name: "Автобус" },
    Truck: { key: "truck", name: "Грузовик" },
}

export type Points = BusStop | GasStation | Warehouse | Point | Entertainment
export type Vehicles = Vehicle | Bus | Truck // | Bike 

export function random(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1) + min) }

export class Manager {
    #vehicles: Vehicles[] = []
    #navigator: Navigator = new Navigator(new GameMap([], []))

    constructor(points?: Points[], map?: GameMap, vehicles?: Vehicles[]) {
        if (map && points) { this.#navigator = new Navigator(map) }
        if (vehicles) this.#vehicles = vehicles
    }

    addPoint(point: Points) {
        this.#navigator.addPoint(point)
    }

    addRoute(from: number, to: number) {
        if (from < 0 || to < 0 || from >= this.#navigator.points.length || to >= this.#navigator.points.length)
            throw new Error("(Manager) Invalid index of point in route creation")

        this.#navigator.addRoute(from, to)
    }

    addVehicle(vehicle: Vehicles) { this.#vehicles.push(vehicle) }

    setConfiguration(config: any, w: number, h: number) {
        // TODO: Implement import from file
        this.#navigator = new Navigator(new GameMap([], []))
        this.#vehicles = []

        switch (config) {
            case ManagerConfiguration.Default.key:
                //this.#defaultSetup(w, h)
                break

            case ManagerConfiguration.Bus.key:
                this.#busSetup(w, h)
                break

            /*
            case ManagerConfiguration.Truck.key:
                this.#truckSetup(w, h)
                break*/

            default:
                this.#defaultSetup(w, h)
        }
    }

    #defaultMap(maxW: number, maxH: number) {
        this.addPoint(new BusStop(maxW * 0.1, maxH * 0.1, 5, 30, 5000))
        this.addPoint(new Warehouse(maxW * 0.1, maxH * 0.9, 5, random(10000, 50000)))
        this.addPoint(new GasStation(maxW * 0.15, maxH * 0.55, 5, 10, 2000))

        this.addRoute(0, 2);
        this.addRoute(1, 2);

        this.addPoint(new Entertainment(maxW * 0.3, maxH * 0.7, 5, random(3000, 10000)))
        this.addRoute(2, 3);

        this.addPoint(new Warehouse(maxW * 0.35, maxH * 0.2, 5, random(10000, 50000)))
        this.addRoute(3, 4);
        this.addRoute(0, 4);

        this.addPoint(new BusStop(maxW * 0.6, maxH * 0.4, 5, 20, 3000))
        this.addRoute(4, 5);
        this.addRoute(3, 5);

        this.addPoint(new GasStation(maxW * 0.9, maxH * 0.1, 5, 5, 1000))
        this.addRoute(4, 6);

        this.addPoint(new Entertainment(maxW * 0.6, maxH * 0.7, 5, random(1000, 5000)))
        this.addRoute(5, 7);
        this.addRoute(6, 7);

        this.addPoint(new BusStop(maxW * 0.9, maxH * 0.9, 5, 50, 10000))
        this.addRoute(1, 8);
        this.addRoute(7, 8);
        this.addRoute(6, 8);
    }


    #defaultSetup(maxW: number, maxH: number) {
        this.#defaultMap(maxW, maxH)

        this.addVehicle(new Vehicle("222222", 60,
            100, 100, 1,
            this.#navigator.findRoute(this.points[random(0, this.points.length)], this.points[random(0, this.points.length)]),
            this.points[0], this.#navigator))

        this.addVehicle(new Vehicle("111111", 60,
            100, 100, 1,
            this.#navigator.findRoute(this.points[random(0, this.points.length)], this.points[random(0, this.points.length)]),
            this.points[0], this.#navigator))
    }


    #busSetup(maxW: number, maxH: number) {
        this.#defaultMap(maxW, maxH)

        this.addVehicle(new Bus("101", 40, 200, 100, 1, [
            this.points[0],
            this.points[5],
            this.points[7],
        ], this.points[0], this.#navigator))

        this.addVehicle(new Bus("102", 50, 200, 100, 1, [
            this.points[7],
            this.points[0],
            this.points[5],
        ], this.points[0], this.#navigator))
    }

    #truckSetup(maxW: number, maxH: number) {
        this.#defaultMap(maxW, maxH)

        // this.addVehicle(new Truck("Атб", 30, 300, 200, 2, [
        //     this.points[1],
        //     this.points[8],
        //     this.points[6],
        //     this.points[4],
        // ], this.points[8], 1000, 0))
    }

    get map() { return this.#navigator.map }
    get points() { return this.#navigator.points }
    get vehicles() { return this.#vehicles }

    update() { this.#vehicles.forEach(v => v.update()) }
}
