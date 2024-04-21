import {FC, useEffect, useState} from "react";
import { Vehicle as VehicleType } from '../../redux/features/vehiclesSlice';
import ReactCardFlip from 'react-card-flip';
import ProgressBar from "../ProgressBar";
import style from './style.module.less';
import Portal from "../Portal";

interface FlipState {
    flip: boolean;
}

const Vehicle: FC<{ vehicle: VehicleType }> = ({ vehicle }) => {
    const [flip, setFlip] = useState<FlipState>({ flip: false });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const handleMouseEnter = () => {
        setFlip({ flip: true });
    };

    const handleMouseLeave = () => {
        setFlip({ flip: false });
    };

    const exactName = vehicle.name.split('_').slice(1).join('_');
    const handleViewFullClick = () => {
        setLoading(true);
        setShowModal(true);
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [showModal]);

    return (
        <div className={style.vehicleCard} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ReactCardFlip isFlipped={flip.flip} flipDirection="horizontal">
                <div className={style.frontComponent}>
                    <div className={style.icon} style={{backgroundImage: `url(${vehicle.nation.icons.large})`}}>
                        <picture>
                            <source srcSet={vehicle.icons.medium}/>
                            <img src={vehicle.icons.medium} alt=""/>
                        </picture>
                    </div>
                    <div className={style.shortInfo}>
                        <div className={style.shortInfoCont}>
                            <h3>{exactName}</h3>
                            <div className={style.color} style={{backgroundColor: `${vehicle.nation.color}`}}></div>
                        </div>
                    </div>
                    <div className={style.progress}>
                        <ProgressBar value={vehicle.level}/>
                    </div>
                </div>
                <div className={style.backComponent}>
                    <div className={style.leftSide}>
                        <div className={style.title}>
                            <picture>
                                <source srcSet={vehicle.nation.icons.large}/>
                                <img src={vehicle.nation.icons.large} alt=""/>
                            </picture>
                            <h5>Name : </h5>
                            <p>{exactName}</p></div>
                        <div>Nation: <p style={{textTransform: 'capitalize'}}>{vehicle.nation.name}</p></div>
                        <div>Color: <div className={style.colorCurc}
                                         style={{backgroundColor: `${vehicle.nation.color}`}}></div></div>
                        <div>Class: <p>{vehicle.type.name}</p></div>
                        <div>Level: <p>{vehicle.level}</p></div>
                        {vehicle.description ? (<div>Description: <p>{vehicle.description}</p></div>): (
                            <div>Description: <p>-</p></div>
                        )}
                        <button className={`${style.full} ${style.full} ${showModal && style.clicked}`}
                                onClick={handleViewFullClick}>View Full
                        </button>
                    </div>
                </div>
            </ReactCardFlip>
            {showModal &&
                <Portal rootId="portal-root">
                    <div className={style.modal}>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className={style.modalContent}>
                                <button className={style.close} onClick={() => setShowModal(false)}>×</button>
                                <img src={vehicle.icons.large} alt="Full size" />
                            </div>
                        )}
                    </div>
                </Portal>
            }

        </div>
    )
}

export default Vehicle;
