import { useState } from "react"
import CPoint from "./CPoint"
import { Point } from "../../../model/points/point"

interface Props {
    point: Point
    onDropHandler?: any
    className?: any
    number?: number
    onClick?: any
}


export default function CNotype({ point, className, onDropHandler, number, onClick }: Props) {
    const [popup, setPopup] = useState(false)

    return (
        <>
            <CPoint number={number} onClick={(e: any) => {
                if (onClick) onClick(e, point)
                else setPopup(prev => !prev)
            }}
                point={point} onDropHandler={onDropHandler} className={className} x={point.x} y={point.y}>

                <div title="Точка" onClick={() => setPopup(prev => !prev)} />

            </CPoint>
        </>
    )
}
