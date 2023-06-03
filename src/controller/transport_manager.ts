import { Vehicle, VehicleType } from '../model/vehicles/vehicle';
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
    private static _instance: Manager

    #vehicles: Vehicles[] = []
    navigator: Navigator = new Navigator(new GameMap([], []))

    constructor(points?: Points[], map?: GameMap, vehicles?: Vehicles[]) {

        if (map && points) this.navigator = new Navigator(map)
        if (vehicles) this.#vehicles = vehicles
    }

    public static Instance(points?: Points[], map?: GameMap, vehicles?: Vehicles[]) {
        return this._instance || (this._instance = new this(points, map, vehicles))
    }

    removeCar(veh: Vehicles) {
        const i = this.#vehicles.findIndex(el => el.uid === veh.uid)

        if (i === -1) return

        this.#vehicles.splice(i, 1)
    }

    addPoint(point: Points) {
        this.navigator.addPoint(point)
    }

    addRoad(from: number, to: number, speedLimit: number, trucksAllowed: boolean) {
        if (from < 0 || to < 0 || from >= this.map.points.length || to >= this.map.points.length)
            throw new Error("(Manager) Invalid index of point in route creation")

        this.navigator.addRoad(from, to, speedLimit, trucksAllowed)
    }

    addVehicle(type: VehicleType, point: Points): void;
    addVehicle(vehicle: Vehicles): void;

    addVehicle(props: unknown, point?: Points): void {
        if (point) {
            switch (props as VehicleType) {
                case VehicleType.CAR:
                    this.#vehicles.push(new Vehicle("Car_" + Vehicle._uid, random(30, 50), 100, 100, 1, [], point, this.navigator))
                    break

                case VehicleType.BUS:
                    this.#vehicles.push(new Bus("Bus_" + Vehicle._uid, random(30, 50), 100, 100, 1, [], point, this.navigator, true, [], 30, 0))
                    break

                case VehicleType.TRUCK:
                    this.#vehicles.push(new Truck("Truck_" + Vehicle._uid, random(30, 40), 300, 200, 2, [], point, 1000, this.navigator))
                    break
            }
        }
        else this.#vehicles.push(props as Vehicles)
    }


    setConfiguration(w: number, h: number) {
        this.navigator = new Navigator(new GameMap([], []))
        this.#vehicles = []

        this.#clear()
        this.#defaultMap(w, h)
    }

    #clear() {
        Point.reset()
        this.#vehicles = []
        this.navigator = new Navigator(new GameMap([], []))
    }

    #defaultMap(maxW: number, maxH: number) {
        this.addPoint(new BusStop(maxW * 0.1, maxH * 0.1, 5, 30, 5000))
        this.addPoint(new Warehouse(maxW * 0.1, maxH * 0.9, 5, random(10000, 50000)))
        this.addPoint(new GasStation(maxW * 0.15, maxH * 0.55, 5, 10, 2000))

        this.addRoad(0, 2, 0, false);
        this.addRoad(1, 2, 0, true);

        this.addPoint(new Entertainment(maxW * 0.3, maxH * 0.7, 5, random(3000, 10000)))
        this.addRoad(3, 2, 0, false);

        this.addPoint(new Warehouse(maxW * 0.35, maxH * 0.2, 5, random(10000, 50000)))
        this.addRoad(3, 4, 30, false);
        this.addRoad(0, 4, 0, false);

        this.addPoint(new BusStop(maxW * 0.6, maxH * 0.4, 5, 20, 3000))
        this.addRoad(4, 5, 50, true);
        this.addRoad(3, 5, 50, true);

        this.addPoint(new GasStation(maxW * 0.9, maxH * 0.1, 5, 5, 1000))
        this.addRoad(4, 6, 0, true);

        this.addPoint(new Entertainment(maxW * 0.6, maxH * 0.7, 5, random(1000, 5000)))
        this.addRoad(5, 7, 60, true);
        this.addRoad(6, 7, 0, true);

        this.addPoint(new BusStop(maxW * 0.9, maxH * 0.9, 5, 50, 10000))
        this.addRoad(1, 8, 0, true);
        this.addRoad(7, 8, 0, true);
        this.addRoad(6, 8, 90, true);
    }

    get map() { return this.navigator.map }
    get vehicles() { return this.#vehicles }

    update() { this.#vehicles.forEach(v => v.update()) }
}