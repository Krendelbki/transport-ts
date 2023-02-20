import { useState } from "react"
import CPoint from "./CPoint"
import { Point } from "../../../model/points/point"

export default function CNotype({ point } : { point: Point }) {
    const [popup, setPopup] = useState(false)

    return (
        <>
            <CPoint x={point.x} y={point.y}>
                <div title="Точка" onClick={() => setPopup(prev => !prev)} />
            </CPoint>
        </>
    )
}
