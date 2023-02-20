import { setInterval } from "timers/promises";
import { Points, random } from "../../controller/transport_manager";
import { BusStop } from "../points/bus_stop_point";
import { PointType } from "../points/point";
import { Vehicle, VehicleType } from "./vehicle";

export class Bus extends Vehicle {
    protected _type: VehicleType = VehicleType.BUS
    #maxNumberOfPassengers: number = 30
    #numberOfPassengers: number = 0

    constructor
        (number: string, speed: number, gasCapacity: number, gasLevel: number, gasConsumption: number,
            route: Points[], point: Points, canMove?: boolean, path?: Points[],
            maxNumberOfPassengers?: number, numberOfPassengers?: number) {

        super(number, speed, gasCapacity, gasLevel, gasConsumption, route, point, canMove, path)

        if (maxNumberOfPassengers) this.#maxNumberOfPassengers = maxNumberOfPassengers;
        if (numberOfPassengers) this.#numberOfPassengers = numberOfPassengers;
    }

    get maxNumberOfPassengers(): number { return this.#maxNumberOfPassengers }
    set maxNumberOfPassengers(maxNumberOfPassengers: number) { this.#maxNumberOfPassengers = maxNumberOfPassengers }

    get numberOfPassengers(): number { return this.#numberOfPassengers }
    set numberOfPassengers(numberOfPassengers: number) { this.#numberOfPassengers = numberOfPassengers }

    update() {
        if (this.speed <= 0 || !this._canMove) return
        const next = this._nextRoutePoint

        this.updatePosition()
        this.updateGasLevel()

        // If Point is in Route, it's BusStop and it just updated => stop and get passengers
        if (next?.id === this._point?.id &&
            this._point?.type === PointType.BusStop &&
            this.x === this._point.x && this.y === this._point.y) {

            const point = this._point as BusStop

            this.canMove = false

            setTimeout(() => {
                this.#numberOfPassengers -= random(0, this.#numberOfPassengers)
            }, point.stopDuration / 2)

            setTimeout(() => {
                this.#numberOfPassengers += point.getPassengers(random(0, this.#maxNumberOfPassengers - this.#numberOfPassengers))
                this.canMove = true
            }, point.stopDuration)
        }
    }
}
