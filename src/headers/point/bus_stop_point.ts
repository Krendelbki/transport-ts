import { PointType, Point } from "./point";

export class BusStop extends Point {
    #numberOfPassengers: number;

    constructor
    (type: PointType, id: number, numberOfSlots: number, currTakenSlots: number, numberOfPassengers: number) 
    {
        super(type, id, numberOfSlots, currTakenSlots);
        this.#numberOfPassengers = numberOfPassengers;
    }

    get numberOfPassengers() : number { return this.#numberOfPassengers }
    set numberOfPassengers(numberOfPassengers: number) { this.#numberOfPassengers = numberOfPassengers }
}