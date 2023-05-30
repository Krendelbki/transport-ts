import { GameMap } from './../../model/map';
import { Points, Vehicles } from "../../controller/transport_manager"

export interface IAppContext {
    tableRef: React.RefObject<HTMLDivElement>
    timeout: number
    increaseTimeout: () => void
    decreaseTimeout: () => void

    setConfiguration: () => void
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    restart: () => void

    points: Points[]
    vehicles: Vehicles[]
    map: GameMap

    selectedVeh: Vehicles | null
    setSelectedVeh: React.Dispatch<React.SetStateAction<Vehicles | null>>

    isRouteShow: boolean
    setIsRouteShow: React.Dispatch<React.SetStateAction<boolean>>
    
    isCarEditing: boolean
    setIsCarEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const InitialState: IAppContext = {
    tableRef: { current: null },
    timeout: 0,
    increaseTimeout: () => { },
    decreaseTimeout: () => { },
    
    setConfiguration: () => { },
    isActive: false,
    setIsActive: () => { },
    restart: () => { },
    
    points: [],
    vehicles: [],
    map: new GameMap([], []),
    
    selectedVeh: null,
    setSelectedVeh: () => {},
    
    isRouteShow: false,
    setIsRouteShow: () => {},

    isCarEditing: false,
    setIsCarEditing: () => {},
}
