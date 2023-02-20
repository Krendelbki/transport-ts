import React from 'react'

interface PointProps {
    children: React.ReactNode
    x: number
    y: number
}

export default function CPoint({ children, x = 0, y = 0 }: PointProps) {
    return (
        <div className='point' style={{ transform: `translate(${x}px, ${y}px)`, boxShadow: "0px 0px 8px -3px #000", userSelect: "none" }}>
            {children}
        </div>
    )
}
