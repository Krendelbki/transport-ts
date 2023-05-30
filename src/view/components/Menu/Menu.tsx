import { useContext, useState } from 'react';
import { AppContext, manager } from '../..';
import classes from './Menu.module.css';
import ButtonAdd from '../UI/ButtonAdd/ButtonAdd';
import ButtonRemove from '../UI/ButtonRemove/ButtonRemove';
import ButtonRestart from '../UI/ButtonRestart/ButtonRestart';
import ButtonStart from '../UI/ButtonStart/ButtonStart';
import CarInfo from './CarInfo/CarInfo';
import { Bus } from '../../../model/vehicles/bus';
import VehTab from './VehTab/VehTab';
import ButtonAddCar from '../UI/ButtonAddCar';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ButtonRemoveCar from '../UI/ButtonRemoveCar';
import ButtonEditCar from '../UI/ButtonEditCar';
import ButtonRouteCar from '../UI/ButtonRouteCar';
import RouteControlInfo from './RouteControlInfo/RouteControlInfo';

export default function Menu() {
    const [parent] = useAutoAnimate()

    const { timeout, vehicles, selectedVeh, isCarEditing, isRouteShow, setIsRouteShow, setIsActive, setIsCarEditing } = useContext(AppContext)
    const [isVehTabVisible, setIsVehTabVisible] = useState<boolean>(false)

    return (
        <menu ref={parent} >
            <div className={classes.header}>
                <h2 className={classes.title}>Меню</h2>
                <div className={classes.line}></div>

                <h4 className={classes.interval}>Інтервал оновлення:<span>{timeout / 1000}</span> c</h4>

                <div className="btns">
                    <ButtonRemove />
                    <ButtonAdd />
                </div>
            </div>

            <div className={classes.header} style={{ gap: "10px" }}>
                {selectedVeh && isRouteShow && !isCarEditing && <RouteControlInfo/> }
                <CarInfo isRouteShow={isRouteShow} car={selectedVeh as Bus} isEditing={isCarEditing} />

                {selectedVeh &&
                    <div className={classes.info_btns}>
                        <ButtonRouteCar onClick={() => { setIsRouteShow(prev => !prev) }} />

                        <ButtonEditCar onClick={() => { setIsCarEditing(prev => { if (!prev) setIsActive(false); return !prev }) }} />

                        <ButtonRemoveCar onClick={() => { manager.removeCar(selectedVeh.uid) }} style={{ marginLeft: "auto" }} />
                    </div>
                }
            </div>


            {!selectedVeh && <VehTab isVisible={isVehTabVisible} />}
            {!selectedVeh && <ButtonAddCar setIsVisible={setIsVehTabVisible} />}

            <div className={classes.footer}>
                <ButtonStart />
                <ButtonRestart />
            </div>
        </menu>
    )
}
