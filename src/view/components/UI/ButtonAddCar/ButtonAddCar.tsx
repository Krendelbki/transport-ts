import classes from "./ButtonAddCar.module.css"

export default function ButtonAddCar( {setIsVisible} : {setIsVisible: React.Dispatch<React.SetStateAction<boolean>>} ) {

	return <button type="button" title="Додати машини" onClick={ () => setIsVisible(prev => !prev)} className={classes.button}>
		<img src="./img/icons/addCar.png" alt="" />
	</button>
}
