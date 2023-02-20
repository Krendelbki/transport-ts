import React, { useContext } from "react"
import classes from "./ButtonRemove.module.css"
import { AppContext } from "../../.."

export default function ButtonRemove() {
	const { decreaseTimeout } = useContext(AppContext)

	return <button type="button" title="Відняти" onClick={decreaseTimeout} className={classes.button}></button>
}
