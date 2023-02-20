import { useContext } from 'react'
import classes from './Popup.module.css'
import { AppContext } from '../../..'

interface PopupProps {
    children: React.ReactNode
    x: number
    y: number
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Popup({ children, x = 0, y = 0, isVisible, setIsVisible }: PopupProps) {

    const { timeout } = useContext(AppContext)

    const style: React.CSSProperties = {
        transition: `transform ${timeout}ms linear`,
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
