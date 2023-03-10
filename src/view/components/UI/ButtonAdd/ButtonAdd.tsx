import { useContext } from "react"
import classes from "./ButtonAdd.module.css"
import { AppContext } from "../../.."

export default function ButtonAdd() {
	const { increaseTimeout } = useContext(AppContext)
	return <button type="button" title="Додати" onClick={increaseTimeout} className={classes.button}></button>
}
