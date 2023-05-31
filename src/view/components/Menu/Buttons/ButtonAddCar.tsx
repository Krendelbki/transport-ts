export default function ButtonAddCar({ setIsVisible }: { setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {

	return <button type="button" title="Додати машини" onClick={(e) => { e.currentTarget.blur(); setIsVisible(prev => !prev) }} className={"button"}>
		<img src="./img/icons/addCar.png" alt="" />
	</button>
}
