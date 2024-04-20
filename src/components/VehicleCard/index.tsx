import  { FC } from "react";
import { Vehicle as VehicleType } from '../../redux/features/vehiclesSlice';

const Vehicle: FC<{ vehicle: VehicleType }> = ({ vehicle }) => {
    return (
        <div>
            <div>
            <img src={vehicle.icons.medium}/>
        </div>
            <div>
                <h3>{vehicle.type.name}</h3>
                <h4>{vehicle.level}</h4>
                <p>Default icon:</p>
                <img src={vehicle.type.icons.default}/>
                <h3>Nation info</h3>
                <h3>{vehicle.nation.name}</h3>
                <h3>{vehicle.nation.title}</h3>
                <h3>{vehicle.nation.color}</h3>
                <h3>{vehicle.nation.name}</h3>
                <img src={vehicle.nation.icons.large}/>
            </div>
        </div>
    )
}

export default Vehicle;
