import { useContext } from 'react'
import classes from './Popup.module.css'
interface PopupProps {
    children: React.ReactNode
    x: number
    y: number
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Popup({ children, x = 0, y = 0, isVisible, setIsVisible }: PopupProps) {

    const style: React.CSSProperties = {
        transform: `translate(${x}px, ${y}px)`
    }

    return (
        <div className={classes.popup}
            style={!isVisible ? { ...style, visibility: "hidden" } : style}
            onClick={() => setIsVisible(prev => !prev)}
        >
            {children}
        </div>
    )
}
