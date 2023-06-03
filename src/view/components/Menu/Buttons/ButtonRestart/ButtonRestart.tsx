import { useContext } from "react"
import classes from "./ButtonRestart.module.css"
import { AppContext } from "../../../.."

export default function ButtonRestart() {
	const { restart, isCarEditing } = useContext(AppContext)
	return <button style={{backgroundImage: "url('./img/icons/restart.svg')"}} type="button" title="Reset" className={classes.button} onClick={() => { if (!isCarEditing) restart() }}></button>
}
