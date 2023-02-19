import { Vehicle, getRandInt } from "./vehicle";
import { Navigator } from "../navigator";

export class Bicycle extends Vehicle {
    #chanceOfGoingOffRoad: number = 0.5;

    constructor
    (number: number, speed: number, canMove: boolean, gasCapacity: number, gasLevel: number,
        route: number[], navigator: Navigator, currPoint: number, stopCount: number,
        chanceOfGoingOffRoad: number)
    {
        super(number, speed, canMove, gasCapacity, gasLevel, route, navigator, currPoint, stopCount);

        this.#chanceOfGoingOffRoad = chanceOfGoingOffRoad;
    }

    get chanceOfGoingOffRoad() : number { return this.#chanceOfGoingOffRoad }
    set chanceOfGoingOffRoad(chanceOfGoingOffRoad: number) { this.#chanceOfGoingOffRoad = chanceOfGoingOffRoad }

    protected updateCurrPoint(): void {
        if (this._route.length === 0) return;

        if ((getRandInt(101) / 100) < this.#chanceOfGoingOffRoad) {
            this._currPoint = this._route[this._route.length - 1];
            // When .findRoute() implemented change 10 to 11
            this._route = this._navigator.findRoute(this._currPoint, getRandInt(10));
            return;
        }

        this._route = this._route.reverse();
        let maybe_currPoint: number | undefined;

        maybe_currPoint = this._route.pop();
        if (maybe_currPoint !== undefined) this._currPoint = maybe_currPoint;

        this._route = this._route.reverse();
    }

    protected update(consumption: number): void {
        if (!this._canMove) return;

        if (this._route.length === 0) {
            // When .findRoute() implemented change 10 to 11
            this._route = this._navigator.findRoute(this._currPoint, getRandInt(10));
        }

        this.updateCurrPoint();
    }
}