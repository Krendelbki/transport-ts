import { Entertainment } from './../points/entertainment_point';
import { Navigator } from '../navigator';
import { Points } from '../../controller/transport_manager';
import { PointType } from '../points/point';
import { GasStation } from '../points/gas_station_point';
import { GameMap } from '../map';

export enum VehicleType {
	CAR,
	BUS,
	TRUCK,
	Bike,
}

export class Vehicle {
	#navigator: Navigator

	protected _x: number
	protected _y: number
	protected _rotation: number = 0

	protected _number: string
	protected _speed: number
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
	nextPoint(): Points | undefined { return this._path[0] }

	#updateRotation(next: Points | undefined) {
		if (!next) return
		const nextRotation = Math.atan2(next.y - this._y, next.x - this._x)

		this._rotation = nextRotation
	}

	#needToFuel() {
		if (this._gasLevel <= 0.15 * this.gasCapacity) {
			this._path = []
			const gasStation = Navigator.findGasStation(this._point)

			if (gasStation) this._route = [gasStation, ...this._route]
		}
	}

	protected updateGasLevel() { if (this._gasLevel > this.gasConsumption && this.nextPoint()) this._gasLevel -= this._gasConsumption }

	#checkNextRoutePoint() {
		if (!this._route.length || this._path.length || !this._point) return

		this._path = [...this._path, ...this.#navigator.findRoute(this._point, this._route[0])]
		this._nextRoutePoint = this._route[0]
		this._route.shift()

		if (this._path.length) this.#updateRotation(this.nextPoint())
	}

	protected updatePosition() {
		if (!this._point || !this._canMove) return

		this.#checkNextRoutePoint()
		const next: Points | undefined = this.nextPoint()

		if (!next) return
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
					}, point.stopDuration)
				}
				else if (this._point?.type === PointType.GasStation) {
					const point = this._point as GasStation
					this._canMove = false

					const refuelingTime = (this.gasCapacity - this.gasLevel) * 1000 / point.refuellingSpeedCoef

					setTimeout(() => {
						this.gasLevel += this._gasLevel + point.getFuel(this.gasCapacity - this.gasLevel)
						this._canMove = true
					}, refuelingTime)
				}
			}

			this.#updateRotation(next_next)
			this.#needToFuel()
		}
		else {
			this._x += dx
			this._y += dy
		}
	}

	update() {
		if (this.speed <= 0 || !this._canMove) return

		this.updatePosition()
		this.updateGasLevel()
	}

	constructor
		(number: string, speed: number, gasCapacity: number, gasLevel: number, gasConsumption: number,
			route: Points[], point: Points, navigator: Navigator, canMove?: boolean, path?: Points[]) {

		this.#navigator = navigator

		this._x = point.x
		this._y = point.y

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

	get type() { return this._type }
	get number() { return this._number }
	get rotation() { return this._rotation * (180 / Math.PI) }

	get x() { return this._x }
	set x(x: number) { this._x = x }

	get y() { return this._y }
	set y(y: number) { this._y = y }

	get canMove() { return this._canMove }
	set canMove(canMove: boolean) { this._canMove = canMove }

	get speed() { return this._speed }
	set speed(speed: number) { if (speed >= 0) this._speed = speed }

	get gasLevel() { return this._gasLevel }
	set gasLevel(gasLevel: number) { if (gasLevel <= this._gasCapacity) this._gasLevel = gasLevel }

	get gasCapacity() { return this._gasCapacity }
	set gasCapacity(gasCapacity: number) { if (gasCapacity >= this._gasLevel) this._gasCapacity = gasCapacity }

	get gasConsumption() { return this._gasConsumption }
	set gasConsumption(gasConsumption: number) { if (gasConsumption >= 0) this._gasConsumption = gasConsumption }
}