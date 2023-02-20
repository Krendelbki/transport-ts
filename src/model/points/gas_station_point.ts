import { PointType, Point } from "./point"

export class GasStation extends Point {
    #refuellingSpeedCoef: number;
    #fuel: number = 0;

    constructor(x: number, y: number, numberOfSlots: number, refuellingSpeedCoef: number, fuel: number, currTakenSlots?: number) {
        super(x, y, numberOfSlots, currTakenSlots, PointType.GasStation);
        this.#refuellingSpeedCoef = refuellingSpeedCoef;
        this.#fuel = fuel;
    }

    getFuel(needFuel: number) {
        let ret = 0

        if (this.#fuel >= needFuel) ret = needFuel
        else ret = this.#fuel

        this.#fuel -= ret
        return ret
    }

    addFuel(fuel: number) {
        this.#fuel += fuel
    }

    get fuel() { return this.#fuel }
    set fuel(fuel: number) { this.#fuel = fuel }

    get refuellingSpeedCoef(): number { return this.#refuellingSpeedCoef }
    set refuellingSpeedCoef(coef: number) { this.#refuellingSpeedCoef = coef }
}