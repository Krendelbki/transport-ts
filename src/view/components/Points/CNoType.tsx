import { useState } from "react"
import CPoint from "./CPoint"
import { Point } from "../../../model/points/point"

export default function CNotype({ point, onDropHandler} : { point: Point, onDropHandler?: any}) {
    const [popup, setPopup] = useState(false)

    return (
        <>
            <CPoint x={point.x} y={point.y}>
                <div title="Точка" onClick={() => setPopup(prev => !prev)} onDrop={(e) => onDropHandler(e, point)} onDragOver={(e) => {e.preventDefault()}}/>
            </CPoint>
        </>
    )
}
