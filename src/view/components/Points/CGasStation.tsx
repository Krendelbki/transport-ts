import { useState } from "react"
import Popup from "../UI/Popup/Popup"
import CPoint from "./CPoint"
import { GasStation } from "../../../model/points/gas_station_point"

interface Props {
	point: GasStation
	onDropHandler?: any
}

export default function CGasStation({ point, onDropHandler }: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<CPoint x={point.x} y={point.y}>
				<div title="Заправка" onClick={() => setPopup(prev => !prev)} onDrop={(e) => onDropHandler(e, point)} onDragOver={(e) => {e.preventDefault()}}>
					<img src="./img/icons/gasStation.png" alt="Gas" />
				</div>
			</CPoint>

			<Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
				<h4>Заправка {point.id}</h4>
				<p>Кількість палива: {point.fuel}</p>
				<p>Швидкість заправки: {point.refuellingSpeedCoef}</p>
			</Popup>
		</>
	)
}
