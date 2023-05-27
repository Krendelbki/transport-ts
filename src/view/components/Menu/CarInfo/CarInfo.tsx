import { Vehicles } from '../../../../controller/transport_manager'
import { VehicleType } from '../../../../model/vehicles/vehicle'
import { Bus } from '../../../../model/vehicles/bus'
import { Truck } from '../../../../model/vehicles/truck'
import classes from "./CarInfo.module.css"
import { AppContext } from '../../..'
import { useContext } from 'react'

export default function CarInfo({ car }: { car: Vehicles | undefined }) {

    const { setSelectedVeh } = useContext(AppContext)

    function getInfo() {

        switch (car?.type) {
            case VehicleType.CAR:
                return <div className={classes.car_info} onClick={() => setSelectedVeh("")}>
                    <h4>Машина "{car.number}"</h4>
                    <p>Швидкість: {car.speed} км/год</p>
                    <p>Кількість палива: {car.gasLevel} л</p>
                </div>
                break

            case VehicleType.BUS:
                const c = car as Bus
                return <div className={classes.car_info} onClick={() => setSelectedVeh("")}>
                    <h4>Автобус "{c.number}"</h4>
                    <p>Швидкість: {c.speed} км/год</p>
                    <p>Кількість палива: {c.gasLevel} л</p>
                    <p>Кількість пасажирів: {c.numberOfPassengers}</p>
                    <p>Кількість місць: {c.maxNumberOfPassengers}</p>
                </div>
                break

            case VehicleType.TRUCK:
                const t = car as Truck
                return <div className={classes.car_info} onClick={() => setSelectedVeh("")}>
                    <h4>Вантажівка "{t.number}"</h4>
                    <p>Швидкість: {t.speed} км/год</p>
                    <p>Кількість палива: {t.gasLevel} л</p>
                    <p>Вантаж: {t.massOfCargo} / {t.maxMassOfCargo} кг</p>
                </div>
                break

            default:
                return <div></div>
                break;
        }
    }

    return getInfo()
}