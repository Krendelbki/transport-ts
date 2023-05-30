import { useState } from "react"
import { Warehouse } from "../../../model/points/warehouse_point"
import CPoint from "./CPoint"
import Popup from "../UI/Popup/Popup"

interface Props {
	point: Warehouse
	onDropHandler?: any
	className?: any
	number?: number
	onClick?: any
}

export default function CWarehouse({ point, onDropHandler, className, number, onClick }: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<CPoint number={number} onClick={(e: any) => {
				if (onClick) onClick(e, point)

				else setPopup(prev => !prev)
			}}
				point={point} onDropHandler={onDropHandler} className={className} x={point.x} y={point.y}>

				<div title="Склад">
					<img src="./img/icons/warehouse.png" alt="Warehouse" />
				</div>

			</CPoint>

			<Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
				<h4>Склад {point.id}</h4>
				<p>Масса товару: {point.mass}</p>
			</Popup>
		</>
	)
}
