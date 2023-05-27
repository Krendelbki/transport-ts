import { useState } from "react"
import { Warehouse } from "../../../model/points/warehouse_point"
import CPoint from "./CPoint"
import Popup from "../UI/Popup/Popup"

interface Props {
	point: Warehouse
	onDropHandler?: any
}

export default function CWarehouse({ point, onDropHandler}: Props) {
	const [popup, setPopup] = useState(false)

	return (
		<>
			<CPoint x={point.x} y={point.y}>
				<div title="Склад" onClick={() => setPopup(prev => !prev)} onDrop={e => onDropHandler(e, point)} onDragOver={(e) => {e.preventDefault()}}>
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
