import { Points } from "../../controller/transport_manager";
import { Navigator } from "../navigator";
import { GasStation } from "../points/gas_station_point";
import { PointType } from "../points/point";
import { Warehouse } from "../points/warehouse_point";
import { Vehicle, VehicleType } from "./vehicle";

export class Truck extends Vehicle {
    protected _type: VehicleType = VehicleType.TRUCK;
   
    #maxMassOfCargo: number = 500;
    #massOfCargo: number = 0;

    update() {
        if (this.speed <= 0 || !this._canMove) return
        
        this.updatePosition(true)
        this.updateGasLevel()
        
        const next = this._nextRoutePoint

        if (next?.id === this._point?.id && this.x === this._point?.x && this.y === this._point?.y) {

            if (this._point?.type === PointType.Warehouse) {
                const point = this._point as Warehouse

                this.canMove = false

                setTimeout(() => {
                    this.canMove = true

                    this.#massOfCargo = point.getCargo(this.#maxMassOfCargo - this.#massOfCargo)
                }, this.#maxMassOfCargo * 5)
            }
            else if(this._point?.type === PointType.GasStation) {
                const point = this._point as GasStation

                this.canMove = false

                setTimeout(() => {
                    this.canMove = true

                    point.addFuel(this.#massOfCargo)
                    this.#massOfCargo = 0

					this._canMove = false

					const refuelingTime = (this.gasCapacity - this.gasLevel) * (1000 / 2) / point.refuellingSpeedCoef

					setTimeout(() => {
						this._gasLevel += point.getFuel(this.gasCapacity - this.gasLevel)
						this._canMove = true
					}, refuelingTime)

                }, this.#massOfCargo * 5)
            }
        }
    }

    constructor(number: string, speed: number, gasCapacity: number, gasLevel: number, gasConsumption: number,
        route: Points[], point: Points, maxMassOfCargo: number, navigator: Navigator, massOfCargo?: number, canMove?: boolean, path?: Points[]) {

        super(number, speed, gasCapacity, gasLevel, gasConsumption, route, point, navigator, canMove, path);

        this.#maxMassOfCargo = maxMassOfCargo;
        if (massOfCargo) this.#massOfCargo = massOfCargo;
    }

    get maxMassOfCargo(): number { return this.#maxMassOfCargo }
    set maxMassOfCargo(maxMassOfCargo: number) { if(this.#massOfCargo <= maxMassOfCargo) this.#maxMassOfCargo = maxMassOfCargo }

    get massOfCargo(): number { return this.#massOfCargo }
    set massOfCargo(massOfCargo: number) { if(this.#maxMassOfCargo >= massOfCargo) this.#massOfCargo = massOfCargo }
}