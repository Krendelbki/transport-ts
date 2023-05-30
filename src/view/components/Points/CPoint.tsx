import React from 'react'
import { Points } from '../../../controller/transport_manager'

interface PointProps {
    children: React.ReactNode
    x: number
    y: number
    point: Points
    className?: any
    number?: number
    onDropHandler?: any
    onClick?: any
}

export default function CPoint({ children, x = 0, y = 0, point, className, number, onDropHandler, onClick }: PointProps) {
    return (
        <div data-number={number} onClick={(e) => onClick(e)} onDrop={(e) => onDropHandler(e, point)} onDragOver={(e) => {e.preventDefault()}} className={["point", className].join(' ')} style={{ transform: `translate(${x}px, ${y}px)`, boxShadow: "0px 0px 8px -3px #000", userSelect: "none" }}>
            {children}
        </div>
    )
}
