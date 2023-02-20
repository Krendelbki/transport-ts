import React from 'react'

interface Props {
    coords: {
        x1: number
        y1: number
        x2: number
        y2: number
    }
}

export default function Road({ coords }: Props) {

    const { x1, y1, x2, y2 } = coords

    return (
        <svg style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            filter: "drop-shadow(0 0 2px #000"
        }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth="10px" />
        </svg>
    )
}
