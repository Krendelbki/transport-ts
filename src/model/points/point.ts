export enum PointType {
    NoType,
    Entertainment,
    GasStation,
    BusStop,
    Warehouse
}

export class Point {
    protected _x: number = 0
    protected _y: number = 0

    protected _pointType: PointType = PointType.NoType

    protected _numberOfSlots: number = 0
    protected _currTakenSlots: number = 0
    protected _id: string = "P_" + Point._uid++
    protected _waitingTime: number = 0

    protected static _uid: number = 0

    constructor(x: number, y: number, numberOfSlots: number, currTakenSlots?: number, type?: PointType) {
        this._x = x
        this._y = y
        this._numberOfSlots = numberOfSlots

        if (type) this._pointType = type
        if (currTakenSlots) this._currTakenSlots = currTakenSlots
    }

    get id(): string { return this._id }

    get x(): number { return this._x }
    set x(x: number) { this._x = x }

    get y(): number { return this._y }
    set y(y: number) { this._y = y }

    get type(): PointType { return this._pointType }
    set type(type: PointType) { this._pointType = type }

    get numberOfSlots(): number { return this._numberOfSlots }
    set numberOfSlots(numberOfSlots: number) { this._numberOfSlots = numberOfSlots }

    get currTakenSlots(): number { return this._currTakenSlots }
    set currTakenSlots(currTakenSlots: number) { this._currTakenSlots = currTakenSlots }

    public static reset() { Point._uid = 0}
}