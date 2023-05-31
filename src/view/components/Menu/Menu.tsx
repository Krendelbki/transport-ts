import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useContext, useState } from 'react';
import { AppContext, manager, round } from '../..';
import { Bus } from '../../../model/vehicles/bus';
import ButtonAdd from './Buttons/ButtonAdd/ButtonAdd';
import ButtonAddCar from './Buttons/ButtonAddCar';
import ButtonEditCar from './Buttons/ButtonEditCar';
import ButtonRemove from './Buttons/ButtonRemove/ButtonRemove';
import ButtonRemoveCar from './Buttons/ButtonRemoveCar';
import ButtonRestart from './Buttons/ButtonRestart/ButtonRestart';
import ButtonRouteCar from './Buttons/ButtonRouteCar';
import ButtonStart from './Buttons/ButtonStart/ButtonStart';
import CarInfo from './CarInfo/CarInfo';
import classes from './Menu.module.css';
import RouteControlInfo from './RouteControlInfo/RouteControlInfo';
import VehTab from './VehTab/VehTab';

export default function Menu() {
    const [parent] = useAutoAnimate()

    const { timeout, selectedVeh, isCarEditing, isRouteShow, setIsRouteShow, setIsActive, setIsCarEditing, increaseTimeout, decreaseTimeout, } = useContext(AppContext)
    const [isVehTabVisible, setIsVehTabVisible] = useState<boolean>(false)

    return (
        <menu ref={parent} >
            <div className={classes.section}>
                <h2 className={classes.title}>Меню</h2>
                <div className={classes.line}></div>

                <h4 className={classes.interval}>Швидкісь:<span>{round(1 / (timeout / 1000))}</span> x</h4>

                <div className="btns">
                    <ButtonRemove onClick={() => { increaseTimeout() }} />
                    <ButtonAdd onClick={(e: any) => { e.currentTarget.blur(); decreaseTimeout() }} />
                </div>
            </div>

            <div className={classes.section} style={{ gap: "10px" }}>
                {selectedVeh && isRouteShow && !isCarEditing && <RouteControlInfo />}

                <CarInfo car={selectedVeh as Bus} isEditing={isCarEditing} />

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
