import { Vehicles } from '../../../../controller/transport_manager'
import { Vehicle, VehicleType } from '../../../../model/vehicles/vehicle'
import { Bus } from '../../../../model/vehicles/bus'
import { Truck } from '../../../../model/vehicles/truck'
import classes from "./CarInfo.module.css"
import { AppContext, manager, round } from '../../..'
import { useContext } from 'react'

export default function CarInfo({ car, isEditing }: { car: Vehicles | undefined, isEditing: boolean }) {

    const { setSelectedVeh, setIsCarEditing } = useContext(AppContext)

    function getInfo() {

        if (!isEditing) {
            if (car?.type === VehicleType.CAR) {
                const c = car as Vehicle

                return <div className={classes.car_info} onClick={() => setSelectedVeh(null)}>
                    <h4>Машина "{c.number}"</h4>
                    <p>Швидкість: {round(c.speed)} км/год</p>
                    <p>Кількість палива: {round(c.gasLevel)} л</p>
                </div>
            }
            else if (car?.type === VehicleType.BUS) {
                const c = car as Bus
                return <div className={classes.car_info} onClick={() => setSelectedVeh(null)}>
                    <h4>Автобус "{c.number}"</h4>
                    <p>Швидкість: {round(c.speed)} км/год</p>
                    <p>Кількість палива: {round(c.gasLevel)} л</p>
                    <p>Кількість пасажирів: {Number.parseInt('' + c.numberOfPassengers)}</p>
                    <p>Кількість місць: {Number.parseInt('' + c.maxNumberOfPassengers)}</p>
                </div>

            }
            else if (car?.type === VehicleType.TRUCK) {
                const c = car as Truck
                return <div className={classes.car_info} onClick={() => setSelectedVeh(null)}>
                    <h4>Вантажівка "{c.number}"</h4>
                    <p>Швидкість: {round(c.speed)} км/год</p>
                    <p>Кількість палива: {round(c.gasLevel)} л</p>
                    <p>Вантаж: {round(c.massOfCargo)} / {round(c.maxMassOfCargo)} кг</p>
                </div>
            }
            else return <div></div>
        }

        else {
            const carId = manager.vehicles.findIndex(el => el.uid === car?.uid)

            if (car?.type === VehicleType.CAR) {
                const c = car as Vehicle
                return <div className={classes.car_info + ' ' + classes.global} onClick={() => { setIsCarEditing(false) }}>

                    <div className="col">
                        <div className={classes.car_info_item}>Номер: <input id={classes.number} type='text' placeholder={c.number} onClick={(e) => e.stopPropagation()} onInput={(e) => c.number = e.currentTarget.value} /></div>
                        <div className={classes.car_info_item}>Швидкість: <input id={classes.number} type='number' placeholder={round(c.speed) + ' км/год'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.speed = +e.currentTarget.value || 0} /></div>
                        <label className={classes.car_info_item} onClick={(e) => e.stopPropagation()}><input id={classes.number} type='checkbox' checked={c.isRouteRandom} onClick={(e) => e.stopPropagation()} onChange={(e) => c.isRouteRandom = e.currentTarget.checked} /> Рандомний шлях</label>
                    </div>

                    <div className="col">
                        <div className={classes.car_info_item}>Бак: <input id={classes.number} type='number' placeholder={round(c.gasCapacity) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasCapacity = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Розхід: <input id={classes.number} type='number' placeholder={round(c.gasConsumption) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasConsumption = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Кількість палива: <input id={classes.number} type='number' placeholder={round(c.gasLevel) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasLevel = +e.currentTarget.value || 0} /></div>
                    </div>
                </div>
            }
            else if (car?.type === VehicleType.BUS) {
                const c = car as Bus
                return <div className={classes.car_info + ' ' + classes.global} onClick={() => { setIsCarEditing(false) }}>

                    <div className="col">
                        <div className={classes.car_info_item}>Номер: <input id={classes.number} type='text' placeholder={c.number} onClick={(e) => e.stopPropagation()} onInput={(e) => c.number = e.currentTarget.value} /></div>
                        <div className={classes.car_info_item}>Швидкість: <input id={classes.number} type='number' placeholder={round(c.speed) + ' км/год'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.speed = +e.currentTarget.value || 0} /></div>
                        <label className={classes.car_info_item} onClick={(e) => e.stopPropagation()}><input id={classes.number} type='checkbox' checked={c.isRouteRandom} onClick={(e) => e.stopPropagation()} onChange={(e) => c.isRouteRandom = e.currentTarget.checked} /> Рандомний шлях</label>
                    </div>

                    <div className="col">
                        <div className={classes.car_info_item}>Бак: <input id={classes.number} type='number' placeholder={round(c.gasCapacity) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasCapacity = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Розхід: <input id={classes.number} type='number' placeholder={round(c.gasConsumption) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasConsumption = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Кількість палива: <input id={classes.number} type='number' placeholder={round(c.gasLevel) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasLevel = +e.currentTarget.value || 0} /></div>
                    </div>

                    <div className="col">
                        <div className={classes.car_info_item}>Місць: <input id={classes.number} type='number' placeholder={Number.parseInt('' + c.numberOfPassengers) + ''} onClick={(e) => e.stopPropagation()} onInput={(e) => c.maxNumberOfPassengers = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Пасажирів: <input id={classes.number} type='number' placeholder={Number.parseInt('' + c.numberOfPassengers) + ''} onClick={(e) => e.stopPropagation()} onInput={(e) => c.numberOfPassengers = +e.currentTarget.value || 0} /></div>
                    </div>
                </div>
            }
            else if (car?.type === VehicleType.TRUCK) {
                const c = car as Truck
                return <div className={classes.car_info + ' ' + classes.global} onClick={() => { setIsCarEditing(false) }}>

                    <div className="col">
                        <div className={classes.car_info_item}>Номер: <input id={classes.number} type='text' placeholder={c.number} onClick={(e) => e.stopPropagation()} onInput={(e) => c.number = e.currentTarget.value} /></div>
                        <div className={classes.car_info_item}>Швидкість: <input id={classes.number} type='number' placeholder={round(c.speed) + ' км/год'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.speed = +e.currentTarget.value || 0} /></div>
                        <label className={classes.car_info_item} onClick={(e) => e.stopPropagation()}><input id={classes.number} type='checkbox' checked={c.isRouteRandom} onClick={(e) => e.stopPropagation()} onChange={(e) => c.isRouteRandom = e.currentTarget.checked} /> Рандомний шлях</label>
                    </div>

                    <div className="col">
                        <div className={classes.car_info_item}>Бак: <input id={classes.number} type='number' placeholder={round(c.gasCapacity) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasCapacity = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Розхід: <input id={classes.number} type='number' placeholder={round(c.gasConsumption) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasConsumption = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Кількість палива: <input id={classes.number} type='number' placeholder={round(c.gasLevel) + ' л'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.gasLevel = +e.currentTarget.value || 0} /></div>
                    </div>

                    <div className="col">
                        <div className={classes.car_info_item}>Мах вага: <input id={classes.number} type='number' placeholder={round(c.maxMassOfCargo) + ' кг'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.maxMassOfCargo = +e.currentTarget.value || 0} /></div>
                        <div className={classes.car_info_item}>Вантаж: <input id={classes.number} type='number' placeholder={round(c.massOfCargo) + ' кг'} onClick={(e) => e.stopPropagation()} onInput={(e) => c.massOfCargo = +e.currentTarget.value || 0} /></div>
                    </div>
                </div>
            }
            else return <div></div>
        }
    }

    return getInfo()
}