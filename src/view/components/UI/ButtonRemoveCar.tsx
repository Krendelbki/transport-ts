export default function ButtonRemoveCar({ onClick, style }: { onClick: any, style?: any }) {

	return <button style={style} type="button" title="Видалити машину" onClick={(e) => { e.currentTarget.blur(); onClick(e) }} className={"button "}>
		<img src="./img/icons/trash.png" alt="" />
	</button>
}
