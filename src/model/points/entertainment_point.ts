import { PointType, Point } from "./point";

export class Entertainment extends Point {
    #stopDuration: number = 0;

    constructor(x: number, y: number, numberOfSlots: number, stopDuration: number, currTakenSlots?: number) {
        super(x, y, numberOfSlots, currTakenSlots, PointType.Entertainment);
        this.#stopDuration = stopDuration;
    }

    get stopDuration(): number { return this.#stopDuration }
}