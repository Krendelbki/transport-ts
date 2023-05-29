export class Route {
    public isRoute: boolean = false;
    public length: number = 0
    public speedLimit: number = 0
    public trucksAllowed: boolean = true

    constructor (isRoute: boolean, length: number, speedLimit: number, trucksAllowed: boolean) {
        this.length = length;
        this.speedLimit = speedLimit;
        this.trucksAllowed= trucksAllowed;
    }
}
