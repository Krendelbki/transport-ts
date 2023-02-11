export class GameMap {
    private size: number = 0;
    private map: number[][] = [];

    constructor (size: number, map: number[][]) {
        this.size = size;
        this.map = map;
    }

    public get_size() : number {
        return this.size;
    }

    public get_map() : number[][] {
        return this.map;
    }

    public set_map(map: number[][]) : GameMap {
        this.map = map;
        this.size = countSize(map);

        return this;
    }
}

function countSize(arr: number[][]) : number {

    let counter = 0;

    for (let i = 0; i < arr.length; i++) {
        counter++;
    }

    return counter;
}