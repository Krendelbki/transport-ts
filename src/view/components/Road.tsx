import { Road } from '../../model/road'
import { Vehicle, VehicleType } from '../../model/vehicles/vehicle'

interface Props {
    selectedVeh: Vehicle | null,
    inPath: boolean
    road: Road,
    coords: {
        x1: number
        y1: number
        x2: number
        y2: number
    }
}

export default function CRoad({ road, coords, selectedVeh, inPath }: Props) {

    const { x1, y1, x2, y2 } = coords

    let filter = ""

    if(!road.trucksAllowed && selectedVeh?.type == VehicleType.TRUCK) filter = "drop-shadow(0 0 4px #ED2B2A)"
    else filter = "drop-shadow(0 0 2px #000)"

    if(selectedVeh && inPath) filter = "drop-shadow(0 0 4px #FFFFFF)"

    return (
        <>
            {road.speedLimit !== 0 ? <div className='road-sign' style={{ left: Math.abs(Math.max(x1, x2) - Math.min(x1, x2)) / 2 + Math.min(x1, x2), top: Math.abs(Math.max(y1, y2) - Math.min(y1, y2)) / 2 + Math.min(y1, y2) }}>{road.speedLimit}</div> : null}
            <svg style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                filter:  filter,
            }}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke='#282932' strokeWidth="10px" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke='#aaa' strokeDasharray="10" strokeWidth="3px" />
            </svg>
        </>
    )
}
