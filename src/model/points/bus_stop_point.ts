import { PointType, Point } from "./point";

export class BusStop extends Point {
    #numberOfPassengers: number;
    #stopDuration: number = 1000;

    constructor(x: number, y: number, numberOfSlots: number, numberOfPassengers: number, stopDuration: number, currTakenSlots?: number) {
        super(x, y, numberOfSlots, currTakenSlots, PointType.BusStop);
        this.#numberOfPassengers = numberOfPassengers;
        this.#stopDuration = stopDuration;
    }

    getPassengers(maxNumberOfPassengers: number): number {
        if (this.#numberOfPassengers <= maxNumberOfPassengers) {
            this.#numberOfPassengers = 0;
            return this.#numberOfPassengers;
        } else {
            this.#numberOfPassengers -= maxNumberOfPassengers;
            return maxNumberOfPassengers;
        }
    }

    get stopDuration(): number { return this.#stopDuration }
    set stopDuration(stopDuration: number) { this.#stopDuration = stopDuration }

    get numberOfPassengers(): number { return this.#numberOfPassengers }
    set numberOfPassengers(numberOfPassengers: number) { this.#numberOfPassengers = numberOfPassengers }
}