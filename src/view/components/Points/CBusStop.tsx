import { useState } from "react"
import CPoint from "./CPoint"
import { BusStop } from "../../../model/points/bus_stop_point"
import Popup from "../UI/Popup/Popup"

interface Props {
    point: BusStop
}

export default function CBusStop({point}: Props ) {
    const [popup, setPopup] = useState(false)

    return (
        <>
            <CPoint x={point.x} y={point.y}>
                <div title="Зупинка" onClick={() => setPopup(prev => !prev)}>
                    <img src="./img/icons/busStop.png" alt="Bus Stop" />
                </div>
            </CPoint>

            <Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
                <h4>Зупинка {point.id}</h4>
                <p>Кількість пасажирів: {point.numberOfPassengers}</p>
            </Popup>
        </>
    )
}
