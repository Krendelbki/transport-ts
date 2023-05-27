import { useContext, useState } from 'react';
import { AppContext } from '../..';
import classes from './Menu.module.css';
import ButtonAdd from '../UI/ButtonAdd/ButtonAdd';
import ButtonRemove from '../UI/ButtonRemove/ButtonRemove';
import ButtonRestart from '../UI/ButtonRestart/ButtonRestart';
import ButtonStart from '../UI/ButtonStart/ButtonStart';
import CarInfo from './CarInfo/CarInfo';
import { Bus } from '../../../model/vehicles/bus';
import VehTab from './VehTab/VehTab';
import ButtonAddCar from '../UI/ButtonAddCar/ButtonAddCar';
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Menu() {

    const { timeout, vehicles, selectedVeh } = useContext(AppContext)

    const selected = vehicles.find(el => el.uid === selectedVeh)

    const [parent] = useAutoAnimate()

    const [isVehTabVisible, setIsVehTabVisible] = useState<boolean>(false)

    return (
        <menu ref={parent}>
            <div className={classes.header}>
                <h2 className={classes.title}>Меню</h2>
                <div className={classes.line}></div>

                <h4 className={classes.interval}>Інтервал оновлення: <br /> <span>{timeout / 1000}</span> c</h4>

                <div className="btns">
                    <ButtonRemove />
                    <ButtonAdd />
                </div>
            </div>

            <CarInfo car={selected as Bus} />
            
            {!selected && <VehTab isVisible={isVehTabVisible} />}
            {!selected && <ButtonAddCar setIsVisible={setIsVehTabVisible} />}

            <div className={classes.footer}>
                <ButtonStart />
                <ButtonRestart />
            </div>
        </menu>
    )
}
