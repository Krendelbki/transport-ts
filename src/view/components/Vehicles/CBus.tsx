import { AppContext } from "../.."
import { Bus } from "../../../model/vehicles/bus"
import { useContext } from 'react'

export default function CBus({ veh, transition }: { veh?: Bus, transition: number }) {
    const x = veh?.x || 0
    const y = veh?.y || 0
    const deg = veh?.rotation || 0

    const h = 70

    const { selectedVeh, setSelectedVeh, setIsCarEditing} = useContext(AppContext)

    return (
        <>
            <div className={["vehicle", selectedVeh === veh?.uid ? "selected" : "", veh?.gasLevel === 0 ? "no_fuel" : ""].join(" ")}
                style={{ height: `${h}px`, left: `${x - h/6}px`, top: `${y - h/2}px`, transform: `rotate(${deg + 90}deg)`, transition: `all ${transition+5}ms linear` }}
                onClick={() => {
                    if (selectedVeh === veh?.uid) { setSelectedVeh(""); setIsCarEditing(false)}
                    else setSelectedVeh(veh?.uid || "-1")
                }}
            >
                <img src="./img/bus.png" alt="car" />
            </div>
        </>
    )
}
