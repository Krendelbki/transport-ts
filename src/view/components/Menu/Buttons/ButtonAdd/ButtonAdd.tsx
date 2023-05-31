import classes from "./ButtonAdd.module.css"

export default function ButtonAdd({onClick} : {onClick?: any}) {
	return <button type="button" title="Додати" onClick={onClick} className={classes.button}></button>
}
