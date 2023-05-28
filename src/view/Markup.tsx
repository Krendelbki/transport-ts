import React, { useContext } from 'react'
import Table from './components/Table'
import Menu from './components/Menu/Menu'
import { AppContext } from '.'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Markup() {
    const { points, map, vehicles, selectedVeh, isRouteShow } = useContext(AppContext)

    return (
        <div className='app'>
            <Table points={points} map={map} vehicles={vehicles} selectedVeh={selectedVeh} isRouteShow={isRouteShow} />
            <Menu />
        </div>
    )
}
