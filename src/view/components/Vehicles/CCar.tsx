import { useContext } from "react"
import { Vehicle } from "../../../model/vehicles/vehicle"
import { AppContext } from "../.."

export default function CCar({ transition, veh}: { veh?: Vehicle, transition: number }) {
    const { selectedVeh, setSelectedVeh} = useContext(AppContext)

    const x = veh?.x || 0
    const y = veh?.y || 0
    const deg = veh?.rotation || 0
    const h = 45

    return (
        <>
            <div className={["vehicle", selectedVeh === veh?.uid ? "selected" : "", veh?.gasLevel === 0 ? "no_fuel" : ""].join(" ")} 
                 style={{ height: `${h}px`, transform: `translate(${x - h/4}px, ${y - h/2}px)  rotate(${deg + 90}deg)`, transition: `transform ${transition + 5}ms linear` }} 
                 onClick={() => {
                    if(selectedVeh === veh?.uid) setSelectedVeh("")
                    else setSelectedVeh(veh?.uid || "-1")
                 }}
            >
                <img src="./img/car.png" alt="Car" />
            </div>
        </>
    )
}
