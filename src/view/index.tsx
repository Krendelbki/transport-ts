import { createContext, useState, useRef, useEffect } from 'react'
import { Manager, Points, Vehicles } from '../controller/transport_manager'
import { GameMap } from '../model/map'
import Markup from './Markup'
import { InitialState } from './types/view'
import { VehicleType } from '../model/vehicles/vehicle'

const DELTA = 100

export const AppContext = createContext(InitialState)
export const manager = Manager.Instance()
export function round(num: number) { return Math.round((num + Number.EPSILON) * 100) / 100 }

export function App() {
    const [timeout, setTimeout] = useState<number>(1000)
    const [time, setTime] = useState<number>(0)

    const [isActive, setIsActive] = useState<boolean>(false)

    const [points, setPoints] = useState<Points[]>([])
    const [vehicles, setVehicles] = useState<Vehicles[]>([])
    const [map, setMap] = useState<GameMap>(new GameMap([], []))

    const [selectedCarType, setSelectedCarType] = useState<VehicleType | null>(null)

    const [selectedVeh, setSelectedVeh] = useState<Vehicles | null>(null)
    const [isRouteShow, setIsRouteShow] = useState<boolean>(false)
    const [isCarEditing, setIsCarEditing] = useState<boolean>(false)

    const tableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setPoints(manager.map.points)
    }, [isRouteShow])

    useEffect(() => {
        if (!tableRef.current) return

        const maxW = tableRef.current.clientWidth
        const maxH = tableRef.current.clientHeight

        manager.setConfiguration(maxW, maxH)

        setPoints(manager.map.points)
        setVehicles(manager.vehicles)
        setMap(manager.map)
    }, [tableRef])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => ++prev)
        }, timeout)

        return () => clearInterval(interval)
    }, [timeout])

    useEffect(() => {
        if (!isActive) return
        update(true)
    }, [time])


    function increaseTimeout() {
        if (timeout + DELTA >= 2000) {
            setTimeout(2000)
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
                    decreaseTimeout()
                    break

                case 'arrowdown':
                    increaseTimeout()
                    break

                case ' ':
                    if (!isCarEditing) setIsActive(prev => !prev)
                    break

                case 'r':
                case 'к':
                    if (!isCarEditing) restart()
                    break

                default:
                    break
            }
        }

        window.addEventListener('keydown', keyHandler)

        return () => window.removeEventListener('keydown', keyHandler)
    }, [timeout, isCarEditing])

    function update(updatePosition: boolean) {
        if(updatePosition) manager.update()

        setPoints([...manager.map.points])
        setVehicles([...manager.vehicles])
        setMap(manager.map)
    }

    function onDropHandler(e: any, point: Points) {
        e.preventDefault();
    
        if (!point || selectedCarType == null) return
        manager.addVehicle(selectedCarType, point)
        update(false)
    
        setSelectedCarType(null)
    }

    return (
        <AppContext.Provider value={{
            tableRef,
            timeout,
            increaseTimeout,
            decreaseTimeout,

            isActive,
            setIsActive,
            restart,

            points,
            vehicles,
            map,

            update,

            selectedCarType, 
            setSelectedCarType,

            selectedVeh,
            setSelectedVeh,

            onDropHandler,

            isRouteShow,
            setIsRouteShow,

            isCarEditing,
            setIsCarEditing,
        }}>
            <Markup />
        </AppContext.Provider>
    )
}
