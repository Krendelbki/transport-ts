import { useState } from "react"
import { Warehouse } from "../../../model/points/warehouse_point"
import CPoint from "./CPoint"
import Popup from "../UI/Popup/Popup"

interface Props {
	point: Warehouse
}

export default function CWarehouse({ point }: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<CPoint x={point.x} y={point.y}>
				<div title="Склад" onClick={() => setPopup(prev => !prev)}>
					<img src="./img/icons/warehouse.png" alt="Warehouse" />
				</div>
			</CPoint>

			<Popup isVisible={popup} setIsVisible={setPopup} x={point.x + 40} y={point.y - 30}>
				<h4>Склад</h4>
				<p>Масса товару: {point.mass}</p>
			</Popup>
		</>
	)
}
