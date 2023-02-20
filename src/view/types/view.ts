import { GameMap } from './../../model/map';
import { Points, Vehicles } from "../../controller/transport_manager"

export interface IAppContext {
    tableRef: React.RefObject<HTMLDivElement>
    timeout: number
    increaseTimeout: () => void
    decreaseTimeout: () => void

    setConfiguration: (config: any) => void
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    restart: () => void

    points: Points[]
    vehicles: Vehicles[]
    map: GameMap
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
    map: new GameMap([], [])
}
