import { Navigator } from "../navigator";

export function getRandInt(range: number) : number {
    return Math.floor(Math.random() * range);
}

export class Vehicle {
    protected _number: number = 0;
    protected _speed: number = 50;
    protected _canMove: boolean = true;

    protected _gasCapacity: number = 15;
    protected _gasLevel: number = 1.0;

    protected _route: number[] = [];
    protected _navigator: Navigator;

    protected _currPoint: number = 1;
    protected _stopCount: number = 0;

    protected updateCurrPoint() : void {
        if (this._route.length === 0) return;

        this._route = this._route.reverse();
        let maybe_currPoint: number | undefined;

        maybe_currPoint = this._route.pop();
        if (maybe_currPoint !== undefined) this._currPoint = maybe_currPoint;

        this._route = this._route.reverse();
    }

    protected updateGasLevel(consumption: number) : void {
        if (this._gasLevel > 0.2) {
            this._gasLevel -= consumption;
        }
        else {
            // When .findRoute() implemented change 2 to 3
            // id = 3 -> Gas Station
            this._route = this._navigator.findRoute(this._currPoint, 2);
            this._gasLevel = consumption * this._route.length;
        }
    }

    protected update(consumption: number): void {
        if (!this._canMove) return;

        if (this._route.length == 0) {
            // When .findRoute() implemented change 10 to 11
            this._route = this._navigator.findRoute(this._currPoint, getRandInt(10));
        }

        this.updateCurrPoint();
        this.updateGasLevel(consumption);
    }

    constructor
    (number: number, speed: number, canMove: boolean, gasCapacity: number, gasLevel: number,
        route: number[], navigator: Navigator, currPoint: number, stopCount: number) 
    {
        this._number = number;
        this._speed = speed;
        this._canMove = canMove;

        this._gasCapacity = gasCapacity;
        this._gasLevel = gasLevel;

        this._route = route;
        this._navigator = navigator;

        this._currPoint = currPoint;
        this._stopCount = stopCount;
    }

    get number() : number { return this._number }
    set number(number: number) { this._number = number }

    get speed() : number { return this._speed }
    set speed(speed: number) { this._speed = speed }

    get canMove() : boolean { return this._canMove }
    set canMove(canMove: boolean) { this._canMove = canMove }
    
    get gasCapacity() : number { return this._gasCapacity }
    set gasCapacity(gasCapacity: number) { this._gasCapacity = gasCapacity }

    get gasLevel() : number { return this._gasLevel }
    set gasLevel(gasLevel: number) { this._gasLevel = gasLevel }

    get route() : number[] { return this._route }
    set route(route: number[]) { this._route = route }

    get navigator() : Navigator { return this._navigator }
    set navigator(navigator: Navigator) { this._navigator = navigator }

    get currPoint() : number { return this._currPoint }
    set currPoint(currPoint: number) { this._currPoint = currPoint }

    get stopCount() : number { return this._stopCount }
    set stopCount(stopCount: number) { this._stopCount = stopCount }
}