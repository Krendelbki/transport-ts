import {useContext} from 'react'	
import { AppContext } from '../../..';

export default function ButtonEditCar({ onClick, style }: { onClick?: any, style?: any }) {

	const { isCarEditing } = useContext(AppContext)

	return <button style={style} onClick={(e) => { e.currentTarget.blur(); onClick(e) }} type="button" title="Редагувати дані" className={"button " + (isCarEditing && "selected")}>
		<img src="./img/icons/edit.png" alt="" />
	</button>
}
