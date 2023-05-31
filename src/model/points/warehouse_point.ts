import { PointType, Point } from "./point";

export class Warehouse extends Point {
    #mass: number;

    constructor(x: number, y: number, numberOfSlots: number, mass: number, currTakenSlots?: number) {
        super(x, y, numberOfSlots, currTakenSlots, PointType.Warehouse);
        this.#mass = mass;
    }

    getCargo(needMass: number): number {
        let ret

        if (this.#mass >= needMass) ret = needMass
        else ret = this.#mass

        this.#mass -= ret
        return ret
    }

    get mass(): number { return this.#mass }
}