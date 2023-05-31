import classes from "./ButtonRemove.module.css"

export default function ButtonRemove({onClick} : {onClick?: any}) {
	return <button type="button" title="Відняти" onClick={onClick} className={classes.button}></button>
}
