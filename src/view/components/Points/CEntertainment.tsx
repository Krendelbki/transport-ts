import { useState } from "react"
import Point from "./CPoint"
import Popup from "../UI/Popup/Popup"
import { Entertainment } from "../../../model/points/entertainment_point"

interface Props {
	point: Entertainment
}

export default function CEntertainment({ point }: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<Point x={point.x} y={point.y}>
				<div title="Дозвілля" onClick={() => setPopup(prev => !prev)}>
					<img src="./img/icons/popcorn.png" alt="Entertainment" />
				</div>
			</Point>

			<Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
				<h4>Дозвілля</h4>
				<p>Час зупинки: {point.stopDuration / 1000}c</p>
			</Popup>
		</>
	)
}
