import { useContext } from 'react'
import classes from './Select.module.css'
import { ManagerConfiguration } from '../../../../controller/transport_manager'
import { AppContext } from '../../..'

export default function Select() {
    const { setConfiguration } = useContext(AppContext)

    return (
        <select name="Configuration"
            defaultValue={ManagerConfiguration.Default.key}
            className={classes.select}
            onChange={(e) => setConfiguration(e.target.value)}
        >
            {Object.values(ManagerConfiguration).map((option) =>
                <option key={option.key} value={option.key}>{option.name}</option>
            )}
        </select>
    )
}
