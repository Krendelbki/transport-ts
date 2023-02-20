import React, { useContext } from 'react';
import { AppContext } from '../..';
import classes from './Menu.module.css';
import ButtonAdd from '../UI/ButtonAdd/ButtonAdd';
import ButtonRemove from '../UI/ButtonRemove/ButtonRemove';
import ButtonRestart from '../UI/ButtonRestart/ButtonRestart';
import ButtonStart from '../UI/ButtonStart/ButtonStart';
import Select from '../UI/Select/Select';

export default function Menu() {

    const { timeout } = useContext(AppContext)

    return (
        <menu>
            <h2 className={classes.title}>Меню</h2>

            <h4 className={classes.interval}>Інтервал оновлення: <br/> <span>{timeout / 1000}</span> c</h4>

            <div className="btns">
                <ButtonRemove />
                <ButtonAdd />
            </div>

            <Select />

            <div className={classes.footer}>
                <ButtonStart />
                <ButtonRestart />
            </div>
        </menu>
    )
}
