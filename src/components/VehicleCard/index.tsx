import  { FC } from "react";
import { Vehicle as VehicleType } from '../../redux/features/vehiclesSlice';
import ProgressBar from "../ProgressBar";
import style from './style.module.less'
const Vehicle: FC<{ vehicle: VehicleType }> = ({ vehicle }) => {
    return (
        <div className={style.vehicleCard}>
            <div className={style.icon} style={{backgroundImage: `url(${vehicle.nation.icons.large})`}}>
                <picture>
                    <source srcSet={vehicle.icons.medium}/>
                    <img src={vehicle.icons.medium} alt=""/>
                </picture>
            </div>
            <div className={style.shortInfo}>
                <div className={style.shortInfoCont}>
                <h3>{vehicle.type.name}</h3>
                <div className={style.color} style={{backgroundColor: `${vehicle.nation.color}`}}></div>
            </div>
                <div className={style.progress}>
                <ProgressBar  value={vehicle.level}/>
                </div>
            </div>

            {/*<div>*/}
            {/*    <h3>{vehicle.type.name}</h3>*/}
            {/*    <h4>{vehicle.level}</h4>*/}
            {/*    <ProgressBar value={vehicle.level}/>*/}
            {/*    <p>Default icon:</p>*/}
            {/*    <img src={vehicle.type.icons.default}/>*/}
            {/*    <h3>Nation info</h3>*/}
            {/*    <h3>{vehicle.nation.name}</h3>*/}
            {/*    <h3>{vehicle.nation.title}</h3>*/}
            {/*    <h3>{vehicle.nation.color}</h3>*/}
            {/*    <h3>{vehicle.nation.name}</h3>*/}
            {/*</div>*/}
        </div>
    )
}

export default Vehicle;
