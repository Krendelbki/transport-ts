import { Vehicle } from "./vehicle";
import { Navigator } from "../navigator";

export class Bus extends Vehicle {
    #maxNumberOfPassengers: number = 20;
    #currNumberOfPassengers: number = 0;

    constructor
    (number: number, speed: number, canMove: boolean, gasCapacity: number, gasLevel: number,
        route: number[], navigator: Navigator, currPoint: number, stopCount: number,
        maxNumberOfPassengers: number, currNumberOfPassengers: number)
    {
        super(number, speed, canMove, gasCapacity, gasLevel, route, navigator, currPoint, stopCount);

        this.#maxNumberOfPassengers = maxNumberOfPassengers;
        this.#currNumberOfPassengers = currNumberOfPassengers;
    }

    get maxNumberOfPassengers() : number { return this.#maxNumberOfPassengers }
    set maxNumberOfPassengers(maxNumberOfPassengers: number) { this.#maxNumberOfPassengers = maxNumberOfPassengers }

    get currNumberOfPassengers() : number { return this.#currNumberOfPassengers }
    set currNumberOfPassengers(currNumberOfPassengers: number) { this.#currNumberOfPassengers = currNumberOfPassengers }

    protected update(consumption: number) : void {
        // Points 1, 8 -> Bus Stop
        // Point 3 -> Gas Station
        if (this._route.length === 0 && (this._currPoint == 8 || this._currPoint == 3)) {
            // When .findRoute() implemented change 0 to 1
            this._route = this._navigator.findRoute(this._currPoint, 0);
        }
        else if (this._currPoint == 1) {
            // When .findRoute() implemented change 7 to 8 
            this._route = this._navigator.findRoute(this._currPoint, 7);
        }

        this.updateCurrPoint();
        this.updateGasLevel(consumption);
    }
}