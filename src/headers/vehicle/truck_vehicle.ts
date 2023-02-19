import { Vehicle } from "./vehicle";
import { Navigator } from "../navigator";

export class Truck extends Vehicle {
    #maxMassOfCargo: number = 10.0;
    #currMassOfCargo: number = 0.0;

    constructor
    (number: number, speed: number, canMove: boolean, gasCapacity: number, gasLevel: number,
        route: number[], navigator: Navigator, currPoint: number, stopCount: number,
        maxMassOfCargo: number, currMassOfCargo: number)
    {
        super(number, speed, canMove, gasCapacity, gasLevel, route, navigator, currPoint, stopCount);

        this.#maxMassOfCargo = maxMassOfCargo;
        this.#currMassOfCargo = currMassOfCargo;
    }

    get maxMassOfCargo() : number { return this.#maxMassOfCargo }
    set maxMassOfCargo(maxMassOfCargo: number) { this.#maxMassOfCargo = maxMassOfCargo }

    get currMassOfCargo() : number { return this.#currMassOfCargo }
    set currMassOfCargo(currMassOfCargo: number) { this.#currMassOfCargo = currMassOfCargo }
}