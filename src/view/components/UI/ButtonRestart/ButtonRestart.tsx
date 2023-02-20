import { useContext } from "react"
import classes from "./ButtonRestart.module.css"
import { AppContext } from "../../.."

export default function ButtonRestart() {
	const { restart } = useContext(AppContext)
	return <button type="button" title="Reset" className={classes.button} onClick={restart}></button>
}
