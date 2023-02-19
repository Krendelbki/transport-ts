export enum PointType {
    NoType,
    Entertainment,
    GasStation,
    BusStop,
    Warehouse
}

export class Point {
    protected _pointType: PointType = PointType.NoType;
    protected _id: number = 0;
    protected _numberOfSlots: number = 0;
    protected _currTakenSlots: number = 0;

    constructor (type: PointType, id: number, numberOfSlots: number, currTakenSlots: number) {
        this._pointType = type;
        this._id = id;
        this._numberOfSlots = numberOfSlots;
        this._currTakenSlots = currTakenSlots;
    }

    get pointType() : PointType { return this._pointType }
    set pointType(type: PointType) { this._pointType = type }

    get id() : number { return this._id }
    set id(id: number) { this._id = id }

    get numberOfSlots() : number { return this._numberOfSlots }
    set numberOfSlots(numberOfSlots: number) { this._numberOfSlots = numberOfSlots }

    get currTakenSlots() : number { return this._currTakenSlots }
    set currTakenSlots(currTakenSlots: number) { this._currTakenSlots = currTakenSlots }
        
}