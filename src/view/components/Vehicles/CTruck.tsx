import { useState } from "react"
import Popup from "../UI/Popup/Popup"
import { Truck } from "../../../model/vehicles/truck"

export default function CTruck({ veh, transition }: { veh: Truck, transition: number }) {
    const [popup, setPopup] = useState(false)

    const x = veh.x
    const y = veh.y
    const deg = veh.rotation

    return (
        <>
            <div className="vehicle" style={{ width: "45px", transform: `translate(${x - 22}px, ${y - 75}px) rotate(${deg+90}deg)`, transition: `transform ${transition}ms linear` }} onClick={() => setPopup(prev => !prev)}>
                <img src="./img/truck.png" alt="truck" />
            </div>

            <Popup x={x + 30} y={y - 20} isVisible={popup} setIsVisible={setPopup}>
                <h4>Вантажівка "{veh.number}"</h4>
                <p>Швидкість: {veh.speed} км/год</p>
                <p>Кількість палива: {veh.gasLevel} л</p>
                <p>Максимальна масса: {veh.maxMassOfCargo} кг</p>
                <p>Масса вантажу : {veh.massOfCargo} кг</p>
            </Popup>
        </>
    )
}
