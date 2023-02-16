import { PointType, Point } from "./point"

export class GasStation extends Point {
    #refuellingSpeedCoef: number;

    constructor
    (type: PointType, id: number, numberOfSlots: number, currTakenSlots: number, refuellingSpeedCoef: number) 
    {
        super(type, id, numberOfSlots, currTakenSlots);
        this.#refuellingSpeedCoef = refuellingSpeedCoef;
    }

    get refuellingSpeedCoef() : number { return this.#refuellingSpeedCoef }
    set refuellingSpeedCoef(coef: number) { this.#refuellingSpeedCoef = coef }
}