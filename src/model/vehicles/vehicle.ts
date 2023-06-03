import { Entertainment } from '../points/entertainment_point';
import { Navigator } from '../navigator';
import { Points } from '../../controller/transport_manager';
import { PointType } from '../points/point';
import { GasStation } from '../points/gas_station_point';

export enum VehicleType {
	CAR,
	BUS,
	TRUCK,
	Bike,
}

export function random(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1) + min) }

export class Vehicle {
	navigator: Navigator

	public uid = "C_" + ++Vehicle._uid
	public static _uid = 0

	private _isRouteRandom = true

	protected _x: number
	protected _y: number
	protected _rotation: number = 0

	protected _number: string
	protected _speed: number
	protected _targetSpeed: number

	protected _type: VehicleType = VehicleType.CAR
	protected _gasLevel: number = 0
	protected _gasCapacity: number = 0
	protected _gasConsumption: number = 0

	protected _canMove: boolean = true
	protected _path: Points[] = [] // Path to next point of route
	protected _route: Points[] = [] // All points to visit
	protected _point: Points | undefined // Current point

	protected _nextRoutePoint: Points | undefined

	addPoint(point: Points) { this._route.push(point) }
	addPointFront(point: Points) { this._route = [point, ...this._route] }
	addPointClear(point: Points) { this._route = [point] }

	nextPoint(): Points | undefined { return this._path[0] }

	#updateRotation(next: Points | undefined) {
		if (!next) return

		let angle = Math.atan2(next.y - this._y, next.x - this._x);
		angle = (angle + 180) % 360 - 180

		this._rotation = angle
	}

	#needToFuel(isTruck: boolean) {
		if (this._gasLevel <= 0.3 * this.gasCapacity) {
			this._path = []
			const gasStation: Points | undefined = this.navigator.findGasStation(this._point, this._speed, isTruck);

			if (gasStation) this._route = [gasStation, ...this._route]
		}
	}

	protected updateGasLevel() {
		if (this._gasLevel > this.gasConsumption && this.nextPoint()) this._gasLevel -= this._gasConsumption
		else if (this._gasLevel <= this.gasConsumption) { this.speed = 0; this._gasLevel = 0 }
	}

	#checkNextRoutePoint(isTruck?: boolean) {
		if (this._path.length || !this._point) return

		if (!this._route.length && this._isRouteRandom) {
			for (let i = 0; i < 5; i++) this._route.push(this.navigator.map.points[random(0, this.navigator.map.points.length - 1)])
		}

		if (this._point.type !== PointType.GasStation) this.#needToFuel(isTruck!)

		if (!this.route.length) return
		this._path = [...this.navigator.findRoute(this._point, this._route[0], this._speed, isTruck!)]
		this._nextRoutePoint = this._route[0]
		this._route.shift()

		if (this._path.length) this.#updateRotation(this.nextPoint())
	}

	protected updatePosition(isTruck?: boolean) {
		if (!this._point || !this._canMove) return

		this.#checkNextRoutePoint(isTruck)
		const next: Points | undefined = this.nextPoint()

		if (!next) return

		const startId = +this._point.id.split("_")[1]
		const endId = +next.id.split("_")[1]

		const road = this.navigator.map.map[startId][endId]

		if (road.speedLimit != 0) this._speed = Math.min(road.speedLimit, this._targetSpeed)
		else this._speed = this._targetSpeed

		const dx = this._speed * Math.cos(this._rotation)
		const dy = this._speed * Math.sin(this._rotation)

		const distance = Math.sqrt(Math.pow(next.x - this._x, 2) + Math.pow(next.y - this._y, 2))
		const possibleDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

		if (distance <= possibleDistance) {
			this._point = this.nextPoint()
			this._path.shift()

			this._x = next.x
			this._y = next.y

			const next_next: Points | undefined = this.nextPoint()

			// If new point is a destination point
			if (this._point?.id === this._nextRoutePoint?.id) {
				if (this._point?.type === PointType.Entertainment) {
					const point = this._point as Entertainment

					this._canMove = false

					setTimeout(() => {
						this._canMove = true
						this.update(isTruck)
					}, point.stopDuration)
				}
				else if (this._point?.type === PointType.GasStation) {
					const point = this._point as GasStation
					this._canMove = false

					const refuelingTime = (this.gasCapacity - this.gasLevel) * 1000 / point.refuellingSpeedCoef

					setTimeout(() => {
						this._gasLevel += point.getFuel(this.gasCapacity - this.gasLevel)
						this._canMove = true
						this.update(isTruck)
					}, refuelingTime)
				}
			}

			this.#updateRotation(next_next)
		}
		else {
			this._x += dx
			this._y += dy
		}
	}

	update(isTruck?: boolean) {
		if (this.speed <= 0 || !this._canMove) return

		this.updatePosition(isTruck)
		this.updateGasLevel()
	}

	clearPath() { this._path = this._path.at(0) ? [this._path[0]] : [] }
	clearRoute() { this._route = [] }

	constructor
		(number: string, speed: number, gasCapacity: number, gasLevel: number, gasConsumption: number,
			route: Points[], point: Points, navigator: Navigator, canMove?: boolean, path?: Points[]) {

		this.navigator = navigator

		this._x = point.x
		this._y = point.y

		this._targetSpeed = speed
		this._speed = speed
		this._number = number

		this.gasConsumption = gasConsumption
		this.gasCapacity = gasCapacity
		this.gasLevel = gasLevel

		this._route = route
		this._point = point
		if (path) this._path = path
		if (canMove) this._canMove = canMove
	}

	get route() {
		const route = [...this._route || []]
		const lastPath = this.lastPath()

		if (lastPath) return [lastPath, ...route]

		return route
	}

	private lastPath() {
		if (this._path.length) return this._path[this._path.length - 1]
		else return null
	}

	get path() { return [this._point!, ...this._path] }

	get isRouteRandom() { return this._isRouteRandom }
	set isRouteRandom(state: boolean) { this._isRouteRandom = state }

	get type() { return this._type }

	set number(number: string) { this._number = number }
	get number() { return this._number }

	get rotation() { return this._rotation * (180 / Math.PI) }

	get x() { return this._x }
	set x(x: number) { this._x = x }

	get y() { return this._y }
	set y(y: number) { this._y = y }

	get canMove() { return this._canMove }
	set canMove(canMove: boolean) { this._canMove = canMove }

	get speed() { return this._speed }
	get targetSpeed() { return this._targetSpeed }
	set speed(speed: number) { if (speed >= 0) this._targetSpeed = speed }

	get gasLevel() { return this._gasLevel }
	set gasLevel(gasLevel: number) {
		if (gasLevel < 0) return

		if (gasLevel <= this._gasCapacity) this._gasLevel = gasLevel
		else {
			this._gasCapacity = gasLevel
			this._gasLevel = gasLevel
		}
	}

	get gasCapacity() { return this._gasCapacity }
	set gasCapacity(gasCapacity: number) {
		if (gasCapacity < 0) return

		if (gasCapacity >= this._gasLevel) this._gasCapacity = gasCapacity
		else this._gasCapacity = gasCapacity
	}

	get gasConsumption() { return this._gasConsumption }
	set gasConsumption(gasConsumption: number) { if (gasConsumption >= 0) this._gasConsumption = gasConsumption }
}