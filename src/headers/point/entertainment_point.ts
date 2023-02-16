import { PointType, Point } from "./point";

export class Entertainment extends Point {
    #durationOfStop: number;

    constructor 
    (type: PointType, id: number, numberOfSlots: number, currTakenSlots: number, durationOfStop: number) 
    {
        super(type, id, numberOfSlots, currTakenSlots);
        this.#durationOfStop = durationOfStop;
    }

    get durationOfStop() : number { return this.#durationOfStop }
    set durationOfStop(durationOfStop: number) { this.#durationOfStop = durationOfStop }
}