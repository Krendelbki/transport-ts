import { Vehicle, VehicleType, random } from "../../../../model/vehicles/vehicle"
import { Points } from "../../../../controller/transport_manager"
import { manager } from "../../.."
import { Bus } from "../../../../model/vehicles/bus"
import { Truck } from "../../../../model/vehicles/truck"

type Props = {
	isVisible: boolean
}
let selectedCarType: VehicleType | null = null

export default function VehTab({ isVisible = false }: Props) {
	return (
		isVisible ? 
			<div className="veh_tab">
				<div className="vehicle" style={{height: "70px"}}
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
}

function onDragStartHandler(e: any, type: VehicleType) {
	selectedCarType = type
}

export function onDropHandler(e: any, point: Points) {
	e.preventDefault();

	if (!point || selectedCarType == null) return

	switch (selectedCarType) {
		case VehicleType.CAR:
			manager.addVehicle(new Vehicle("Null", random(40, 70), 100, 100, 1, [], manager.points[+point.id.split('_')[1]], manager.navigator))
			break
			
			case VehicleType.BUS:
			manager.addVehicle(new Bus("Null", random(30, 50), 100, 100, 1, [], manager.points[+point.id.split('_')[1]], manager.navigator, true, [], 30, 0))
			break

		case VehicleType.TRUCK:
			manager.addVehicle(new Truck("Null", random(30, 40), 300, 200, 2, [], manager.points[+point.id.split('_')[1]], 1000, manager.navigator))
			break

		default:
			break
	}

	selectedCarType = null
}