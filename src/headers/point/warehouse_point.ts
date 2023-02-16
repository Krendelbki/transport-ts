import { PointType, Point } from "./point";

export class Warehouse extends Point {
    #massOfCargo: number;

    constructor
    (type: PointType, id: number, numberOfSlots: number, currTakenSlots: number, massOfCargo: number) {
        super(type, id, numberOfSlots, currTakenSlots);
        this.#massOfCargo = massOfCargo;
    }

    get massOfCargo() : number { return this.#massOfCargo }
    set massOfCargo(massOfCargo: number) { this.#massOfCargo = massOfCargo }
}