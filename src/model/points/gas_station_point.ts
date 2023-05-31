import { PointType, Point } from "./point"

export class GasStation extends Point {
    readonly #refuellingSpeedCoef: number;
    #fuel: number = 0;

    constructor(x: number, y: number, numberOfSlots: number, refuellingSpeedCoef: number, fuel: number, currTakenSlots?: number) {
        super(x, y, numberOfSlots, currTakenSlots, PointType.GasStation);
        this.#refuellingSpeedCoef = refuellingSpeedCoef;
        this.#fuel = fuel;
    }

    getFuel(needFuel: number) {
        let ret

        if (this.#fuel >= needFuel) ret = needFuel
        else ret = this.#fuel

        this.#fuel -= ret
        return ret
    }

    addFuel(fuel: number) {
        this.#fuel += fuel
    }

    get fuel() { return this.#fuel }

    get refuellingSpeedCoef(): number { return this.#refuellingSpeedCoef }
}