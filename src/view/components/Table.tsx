import { useContext, useState, useEffect } from "react"
import { AppContext } from ".."
import { BusStop } from "../../model/points/bus_stop_point"
import { Entertainment } from "../../model/points/entertainment_point"
import { GasStation } from "../../model/points/gas_station_point"
import { PointType } from "../../model/points/point"
import { Warehouse } from "../../model/points/warehouse_point"
import { Bus } from "../../model/vehicles/bus"
import { Truck } from "../../model/vehicles/truck"
import { VehicleType } from "../../model/vehicles/vehicle"
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
    selectedVeh: Vehicles | null,
    isRouteShow: boolean
}

enum Key {
    CRTL = 1,
    SHIFT = 2,
    ALT = 3
}

export default function Table({ points, map, vehicles, selectedVeh, isRouteShow }: Props) {
    const { timeout, tableRef, update, onDropHandler } = useContext(AppContext)

    const routePoints = selectedVeh?.route
    const path = selectedVeh?.path

    const [pressedKey, setPressedKey] = useState<Key | null>(null)

    function clickHandler(e: any, point: Points) {
        if (!isRouteShow) return

        if (pressedKey === Key.SHIFT) { if (!selectedVeh?.route) return; selectedVeh.addPoint(point) }
        else if (pressedKey === Key.CRTL) { if (!selectedVeh?.route) return; selectedVeh.addPointFront(point) }
        else if (pressedKey === Key.ALT) { if (!selectedVeh?.route) return; selectedVeh.addPointClear(point) }

        update(false)
    }

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey) setPressedKey(Key.CRTL)
            else if (e.altKey) setPressedKey(Key.ALT)
            else if (e.shiftKey) setPressedKey(Key.SHIFT)
            else setPressedKey(null)
        }

        const keyUpHandler = (e: KeyboardEvent) => { setPressedKey(null) }

        window.addEventListener('keydown', keyHandler)
        window.addEventListener('keyup', keyUpHandler)

        return () => {
            window.removeEventListener('keydown', keyHandler)
            window.removeEventListener('keyup', keyUpHandler)
        }
    }, [])

    return (
        <div className="table" ref={tableRef}>
            {points.sort((a, b) => +a.id.split('_')[1] - +b.id.split('_')[1]).map(point => {
                let selected = -1

                if (isRouteShow && routePoints)
                    for (let i = routePoints.length - 1; i >= 0; i--) { if (routePoints[i].id === point.id) selected = i + 1 }

                return getPoint(point, isRouteShow, clickHandler, selected)
            })}

            {map.map.map((row, i) => {
                return row.map((col, j) => {

                    if (col.length !== 0) {
                        let inPath = false

                        if (isRouteShow && path)
                            for (let k = 0; k < path.length - 1; k++)
                                if (path[k].id === points[j].id && path[k + 1].id == points[i].id)
                                    inPath = true

                        return <Road selectedVeh={selectedVeh} inPath={inPath} road={row[j]} key={"R_" + points[i].x + points[i].y + points[j].x + points[j].y} coords={{ x1: points[i].x, y1: points[i].y, x2: points[j].x, y2: points[j].y }} />
                    }

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

    function getPoint(point: Points, isRouteShow: boolean, clickHandler?: any, selected?: number) {
        switch (point.type) {
            case PointType.NoType:
                return <CNotype onClick={pressedKey && clickHandler} number={selected} point={point} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

            case PointType.GasStation:
                return <CGasStation onClick={pressedKey && clickHandler} number={selected} point={point as GasStation} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

            case PointType.BusStop:
                return <CBusStop onClick={pressedKey && clickHandler} number={selected} point={point as BusStop} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

            case PointType.Entertainment:
                return <CEntertainment onClick={pressedKey && clickHandler} number={selected} point={point as Entertainment} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

            case PointType.Warehouse:
                return <CWarehouse onClick={pressedKey && clickHandler} number={selected} point={point as Warehouse} className={selected !== -1 ? "selected" : ""} key={point.id} onDropHandler={onDropHandler} />

            default: return <></>
        }
    }
}
