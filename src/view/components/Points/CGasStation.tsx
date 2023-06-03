import { useState } from "react"
import Popup from "../UI/Popup/Popup"
import CPoint from "./CPoint"
import { GasStation } from "../../../model/points/gas_station_point"

interface Props {
	point: GasStation
	onDropHandler?: any
	className?: any
	number?: number
	onClick?: any
}

export default function CGasStation({ point, number, onDropHandler, className, onClick }: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<CPoint number={number} onClick={(e: any) => {
				if (onClick) onClick(e, point)
				else setPopup(prev => !prev)
			}}
				point={point} onDropHandler={onDropHandler} className={className} x={point.x} y={point.y}>

				<div title="Заправка">
					<img src="./img/icons/gasStation.png" alt="Gas" />
				</div>

			</CPoint>

			<Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
				<h4>Заправка</h4>
				<p>Кількість палива: {point.fuel}</p>
				<p>Швидкість заправки: {point.refuellingSpeedCoef}</p>
			</Popup>
		</>
	)
}
