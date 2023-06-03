import { AppContext, manager } from "../../.."
import { VehicleType } from "../../../../model/vehicles/vehicle"
import { useContext } from "react"

type Props = {
	isVisible: boolean
}

export default function VehTab({ isVisible = false }: Props) {

	const { update, setSelectedCarType} = useContext(AppContext)

	return (
		isVisible ?
			<div className="veh_tab">
				<div className="vehicle" style={{ height: "70px" }}
					draggable
					onDragStart={(e) => onDragStartHandler(e as any, VehicleType.CAR)}
				>
					<img src="./img/car.png" alt="Car" />
				</div>

				<div className="vehicle"
					draggable
					onDragStart={(e) => onDragStartHandler(e as any, VehicleType.BUS)}
				>
					<img src="./img/bus.png" alt="Bus" />
				</div>

				<div className="vehicle"
					draggable
					onDragStart={(e) => onDragStartHandler(e as any, VehicleType.TRUCK)}
				>
					<img src="./img/truck.png" alt="Truck" />
				</div>
			</div>
			: null
	)
	
	function onDragStartHandler(e: any, type: VehicleType) {
		setSelectedCarType(type)
	}
}
