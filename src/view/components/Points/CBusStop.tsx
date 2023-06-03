import { useState } from "react"
import CPoint from "./CPoint"
import { BusStop } from "../../../model/points/bus_stop_point"
import Popup from "../Popup/Popup"

interface Props {
    point: BusStop,
    onDropHandler?: any
    className?: any
    number?: number
    onClick?: any
}

export default function CBusStop({ point, onDropHandler, className, number, onClick }: Props) {
    const [popup, setPopup] = useState(false)

    return (
        <>
            <CPoint number={number} onClick={(e: any) => {
                if (onClick) onClick(e, point)
                else setPopup(prev => !prev)
            }}
                point={point} onDropHandler={onDropHandler} className={className} x={point.x} y={point.y}>

                <div title="Зупинка" >
                    <img src="./img/icons/busStop.png" alt="Bus Stop" />
                </div>

            </CPoint>

            <Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
                <h4>Зупинка</h4>
                <p>Кількість пасажирів: {point.numberOfPassengers}</p>
            </Popup>
        </>
    )
}
