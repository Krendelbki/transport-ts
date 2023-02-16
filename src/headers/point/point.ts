export enum PointType {
    NoType,
    Entertainment,
    GasStation,
    BusStop,
    Warehouse
}

export class Point {
    #pointType: PointType = PointType.NoType;
    #id: number = 0;
    #numberOfSlots: number = 0;
    #currTakenSlots: number = 0;

    constructor (type: PointType, id: number, numberOfSlots: number, currTakenSlots: number) {
        this.#pointType = type;
        this.#id = id;
        this.#numberOfSlots = numberOfSlots;
        this.#currTakenSlots = currTakenSlots;
    }

    get pointType() : PointType { return this.#pointType }
    set pointType(type: PointType) { this.#pointType = type }

    get id() : number { return this.#id }
    set id(id: number) { this.#id = id }

    get numberOfSlots() : number { return this.#numberOfSlots }
    set numberOfSlots(numberOfSlots: number) { this.#numberOfSlots = numberOfSlots }

    get currTakenSlots() : number { return this.#currTakenSlots }
    set currTakenSlots(currTakenSlots: number) { this.#currTakenSlots = currTakenSlots }
        
}