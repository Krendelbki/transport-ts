import { useState } from "react"
import Popup from "../UI/Popup/Popup"
import { Vehicle } from "../../../model/vehicles/vehicle"

export default function CCar({ veh, transition }: { veh: Vehicle, transition: number }) {
    const [popup, setPopup] = useState(false)

    const x = veh.x
    const y = veh.y
    const deg = veh.rotation

    return (
        <>
            <div className=" vehicle" style={{ width: "90px", transform: `translate(${x - 45}px, ${y - 22}px) rotate(${deg}deg)`, transition: `transform ${transition}ms linear` }} onClick={() => setPopup(prev => !prev)}>
                <img src="./img/car.png" alt="Car" />
            </div>

            <Popup x={x + 30} y={y - 20} isVisible={popup} setIsVisible={setPopup}>
                <h4>Машина "{veh.number}"</h4>
                <p>Швидкість: {veh.speed} км/год</p>
                <p>Кількість палива: {veh.gasLevel} л</p>
            </Popup>
        </>
    )
}
