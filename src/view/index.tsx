import { createContext, useState, useRef, useEffect } from 'react'
import { Mannager, MannagerConfiguration, Points, Vehicles } from '../controller/transport_manager'
import { GameMap } from '../model/map'
import Markup from './Markup'
import { InitialState } from './types/view'

const DELTA = 200

export const AppContext = createContext(InitialState)
const mannager = new Mannager()

export function App() {
    const [timeout, setTimeout] = useState<number>(1000)
    const [time, setTime] = useState<number>(0)

    const [isActive, setIsActive] = useState<boolean>(false)

    const [points, setPoints] = useState<Points[]>([])
    const [vehicles, setVehicles] = useState<Vehicles[]>([])
    const [map, setMap] = useState<GameMap>(new GameMap([], []))

    const tableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!tableRef.current) return

        const maxW = tableRef.current.clientWidth
        const maxH = tableRef.current.clientHeight

        mannager.setConfiguration(MannagerConfiguration.Default, maxW, maxH)

        setPoints(mannager.points)
        setVehicles(mannager.vehicles)
        setMap(mannager.map)
    }, [tableRef])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 1)
        }, timeout)

        return () => clearInterval(interval)
    }, [timeout])

    useEffect(() => {
        if (!isActive) return
        update()
    }, [time])

    function setConfiguration(config: any) {
        if (!tableRef.current) return

        const maxW = tableRef.current.clientWidth
        const maxH = tableRef.current.clientHeight

        mannager.setConfiguration(config, maxW, maxH)

        setPoints(mannager.points)
        setVehicles(mannager.vehicles)
        setMap(mannager.map)

        setIsActive(false)
    }

    function increaseTimeout() {
        if (timeout + DELTA >= 3000) {
            setTimeout(3000)
            return
        }

        setTimeout(prev => prev + DELTA)
    }

    function decreaseTimeout() {
        if (timeout - DELTA <= 100) {
            setTimeout(100)
            return
        }

        setTimeout(prev => prev - DELTA)
    }

    function restart() {
        window.location.reload()
    }

    // Keyboard controls
    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'arrowup':
                    increaseTimeout()
                    break

                case 'arrowdown':
                    decreaseTimeout()
                    break

                case ' ':
                    setIsActive(prev => !prev)
                    break

                case 'r' || 'к':
                    restart()
                    break

                default:
                    break
            }
        }

        window.addEventListener('keydown', keyHandler)

        return () => window.removeEventListener('keydown', keyHandler)
    }, [timeout])

    function update() {
        mannager.update()
        setPoints(mannager.points)
        setVehicles(mannager.vehicles)
        setMap(mannager.map)
    }

    return (
        <AppContext.Provider value={{
            tableRef,
            timeout,
            increaseTimeout,
            decreaseTimeout,

            setConfiguration,
            isActive,
            setIsActive,
            restart,

            points,
            vehicles,
            map
        }}>
            <Markup />
        </AppContext.Provider>
    )
}
