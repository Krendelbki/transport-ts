import { useContext } from "react"
import { AppContext } from ".."
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

export default function Table() {
    const { timeout, tableRef, points, map, vehicles} = useContext(AppContext)

    return (
        <div className="table" ref={tableRef}>
            {points.map(point => {
                switch (point.type) {
                    case PointType.NoType: return <CNotype point={point} key={point.id} onDropHandler={onDropHandler}/>
                    case PointType.GasStation: return <CGasStation point={point as GasStation} key={point.id} onDropHandler={onDropHandler}/>
                    case PointType.BusStop: return <CBusStop point={point as BusStop} key={point.id} onDropHandler={onDropHandler}/>
                    case PointType.Entertainment: return <CEntertainment point={point as Entertainment} key={point.id} onDropHandler={onDropHandler}/>
                    case PointType.Warehouse: return <CWarehouse point={point as Warehouse} key={point.id} onDropHandler={onDropHandler}/>
                    default: return <></>
                }
            })}

            { map.map.map((row, i) =>{
                return row.map((col, j) => {
                    if (col !== 0) return <Road key={ "R_" + points[i].x + points[i].y + points[j].x + points[j].y } coords={{ x1: points[i].x, y1: points[i].y, x2: points[j].x, y2: points[j].y }} />
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
