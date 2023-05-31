import { useContext } from 'react';
import { AppContext } from '../../..';

export default function ButtonRouteCar({ onClick, style }: { onClick?: any, style?: any }) {

	const { isRouteShow } = useContext(AppContext)

	return <button style={style} type="button" onClick={(e) => { e.currentTarget.blur(); onClick(e) }} title="Маршрут" className={["button", isRouteShow ? "selected" : ""].join(' ')}>
		<img src="./img/icons/route.png" alt="" />
	</button>
}
