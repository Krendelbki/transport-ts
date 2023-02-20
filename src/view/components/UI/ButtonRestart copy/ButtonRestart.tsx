import { useContext } from "react"
import classes from "./ButtonStart.module.css"
import { AppContext } from "../../.."

export default function ButtonStart() {
	const { restart } = useContext(AppContext)
	return <button type="button" title="Рестарт" className={classes.button} onClick={restart}></button>
}
