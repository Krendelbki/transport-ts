import { useContext, useState, useEffect } from "react"
import { AppContext, manager } from ".."
import { BusStop } from "../../model/points/bus_stop_point"
import { Entertainment } from "../../model/points/entertainment_point"
import { GasStation } from "../../model/points/gas_station_point"
import { PointType } from "../../model/points/point"
import { Warehouse } from "../../model/points/warehouse_point"
import { Bus } from "../../model/vehicles/bus"
import { Truck } from "../../model/vehicles/truck"
import { VehicleType } from "../../model/vehicles/vehicle"
import { onDropHandler } from "./Menu/VehTab/VehTab"
import CBusStop from "./Points/CBusStop"
import CEntertainment from "./Points/CEntertainment"
import CGasStation from "./Points/CGasStation"
import CNotype from "./Points/CNoType"
import CWarehouse from "./Points/CWarehouse"
import Road from "./Road"
import CBus from "./Vehicles/CBus"
import CCar from "./Vehicles/CCar"
import CTruck from "./Vehicles/CTruck"
import { Points, Vehicles } from "../../controller/transport_manager"
import { GameMap } from "../../model/map"

interface Props {
    points: Points[],
    map: GameMap,
    vehicles: Vehicles[],
    selectedVeh: string,
    isRouteShow: boolean
}

enum Key {
    CRTL,
    SHIFT,
    ALT
}

export default function Table({ points, map, vehicles, selectedVeh, isRouteShow }: Props) {
    const { timeout, tableRef } = useContext(AppContext)

    const routePoints = manager.getRoute(selectedVeh)

    const [pressedKey, setPressedKey] = useState<Key | null>(null)

    function clickHandler(e: any, point: GasStation) {
        const veh = manager.getCar(selectedVeh)

        if (isRouteShow && pressedKey === Key.SHIFT) { if (!veh?.route) return; veh?.route.push(point) }
        if (isRouteShow && pressedKey === Key.CRTL) { if (!veh?.route) return; veh?.route.reverse().push(point); veh.route.reverse() }
        if (isRouteShow && pressedKey === Key.ALT) { if (!veh?.route) return; veh?.clearRoute(); veh.clearPath(); veh.route.push(point) }
    }

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'shift':
                    setPressedKey(Key.SHIFT)
                    break

                case 'control':
                    setPressedKey(Key.CRTL)
                    break

                case 'alt':
                    setPressedKey(Key.ALT)
                    break

                default:
                    setPressedKey(null)
                    break
            }
        }

        const keyUpHandler = (e: KeyboardEvent) => { if (e.key.toLowerCase() in ['shift', 'ctrl', 'alt']) setPressedKey(null) }

        window.addEventListener('keydown', keyHandler)
        window.addEventListener('keyup', keyUpHandler)

        return () => {
            window.removeEventListener('keydown', keyHandler)
            window.removeEventListener('keyup', keyUpHandler)
        }
    }, [])

    return (
        <div className="table" ref={tableRef}>
            {points.reverse().sort((a, b) => +a.id.split('_')[1] - +b.id.split('_')[1]).map(point => {
                let selected = -1

                if (isRouteShow)
                    for (let i = routePoints.length - 1; i >= 0; i--) { if (routePoints[i].id === point.id) selected = i + 1 }

                switch (point.type) {
                    case PointType.NoType:
                        return <CNotype onClick={isRouteShow && clickHandler} number={selected} point={point} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

                    case PointType.GasStation:
                        return <CGasStation onClick={isRouteShow && clickHandler} number={selected} point={point as GasStation} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

                    case PointType.BusStop:
                        return <CBusStop onClick={isRouteShow && clickHandler} number={selected} point={point as BusStop} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

                    case PointType.Entertainment:
                        return <CEntertainment onClick={isRouteShow && clickHandler} number={selected} point={point as Entertainment} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

                    case PointType.Warehouse:
                        return <CWarehouse onClick={isRouteShow && clickHandler} number={selected} point={point as Warehouse} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

                    default: return <></>
                }
            })}

            {map.map.map((row, i) => {
                return row.map((col, j) => {

                    if (col.length !== 0) return <Road key={ "R_" + points[i].x + points[i].y + points[j].x + points[j].y } coords={{ x1: points[i].x, y1: points[i].y, x2: points[j].x, y2: points[j].y }} />

                    else return null
                })
            })}

            {vehicles.map(veh => {
                switch (veh.type) {
                    case VehicleType.CAR: return <CCar transition={timeout} veh={veh} key={veh.uid} />
                    case VehicleType.BUS: return <CBus transition={timeout} veh={veh as Bus} key={veh.uid} />
                    case VehicleType.TRUCK: return <CTruck transition={timeout} veh={veh as Truck} key={veh.uid} />
                    default: return <></>
                }
            })}
        </div>
    )
}
