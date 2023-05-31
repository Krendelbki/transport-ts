import { useContext } from "react"
import classes from "./ButtonStart.module.css"
import { AppContext } from "../../../..";

export default function ButtonStart() {
	const { isActive, setIsActive, isCarEditing } = useContext(AppContext)

	return <button type="button" title="Старт" className={[classes.button, isActive && classes.active].join(" ")} onClick={(e) => { e.currentTarget.blur(); if(!isCarEditing) setIsActive(prev => !prev) }}></button>
}
