import classes from "./RouteControlInfo.module.css"

export default function RouteControlInfo({ }: { }) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.item}>
                <div className={classes.key}>Shift</div>+<img src="./img/icons/click.png" alt="Click" /> 
                Додати в кінець
            </div>

            <div className={classes.item}>
                <div className={classes.key}>Ctrl</div>+<img src="./img/icons/click.png" alt="Click" /> 
                Додати в початок
            </div>

            <div className={classes.item}>
                <div className={classes.key}>Alt</div>+<img src="./img/icons/click.png" alt="Click" /> 
                Очистити та додати
            </div>
        </div>
    )
}