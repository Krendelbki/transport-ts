import { useState } from "react"
import Popup from "../UI/Popup/Popup"
import { Bus } from "../../../model/vehicles/bus"

export default function CBus({ veh, transition }: { veh: Bus, transition: number }) {
    const [popup, setPopup] = useState(false)

    const x = veh.x
    const y = veh.y
    const deg = veh.rotation

    return (
        <>
            <div className="vehicle" style={{ width: "150px", transform: `translate(${x - 75}px, ${y - 25}px) rotate(${deg}deg)`, transition: `transform ${transition}ms linear` }} onClick={() => setPopup(prev => !prev)}>
                <img src="./img/bus.png" alt="car" />
            </div>

            <Popup x={x + 30} y={y - 20} isVisible={popup} setIsVisible={setPopup}>
                <h4>Автобус "{veh.number}"</h4>
                <p>Швидкість: {veh.speed} км/год</p>
                <p>Кількість палива: {veh.gasLevel} л</p>
                <p>Кількість пасажирів: {veh.numberOfPassengers}</p>
                <p>Кількість місць: {veh.maxNumberOfPassengers}</p>
            </Popup>
        </>
    )
}
