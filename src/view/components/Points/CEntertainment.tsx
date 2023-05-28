import { useState } from "react"
import CPoint from "./CPoint"
import Popup from "../UI/Popup/Popup"
import { Entertainment } from "../../../model/points/entertainment_point"

interface Props {
	point: Entertainment,
	onDropHandler?: any
	className?: any
	number?: number
	onClick?: any
}

export default function CEntertainment({ point, onDropHandler, className, number, onClick }: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<CPoint number={number} onClick={(e: any) => {
				if (onClick) onClick(e, point)
				else setPopup(prev => !prev)
			}}
				point={point} onDropHandler={onDropHandler} className={className} x={point.x} y={point.y}>

				<div title="Дозвілля">
					<img src="./img/icons/popcorn.png" alt="Entertainment" />
				</div>

			</CPoint>

			<Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
				<h4>Дозвілля {point.id}</h4>
				<p>Час зупинки: {point.stopDuration / 1000}c</p>
			</Popup>
		</>
	)
}
