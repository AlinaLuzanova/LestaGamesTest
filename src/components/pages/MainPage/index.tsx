import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../../redux/features/vehiclesSlice";
import { RootState } from "../../../store";
import VehicleCard from "../../VehicleCard";
import Dropdown from "../../Dropdown";
import style from './style.module.less'
interface Option {
    value: string;
    label: string;
}

const MainPage: FC = () => {
    const allVehicles = useSelector((state: RootState) => state.vehicles.vehicles);
    const status = useSelector((state: RootState) => state.vehicles.status);
    const error = useSelector((state: RootState) => state.vehicles.error);
    const dispatch = useDispatch();
    const [selectedCountries, setSelectedCountries] = useState<Option[]>([]);
    const [selectedNames, setSelectedNames] = useState<Option[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<Option[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState(allVehicles);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchVehicles());
        }
    }, [status, dispatch]);

    useEffect(() => {
        const filteredByNames = selectedNames.length === 0
            ? allVehicles
            : allVehicles.filter(vehicle =>
                selectedNames.some(name => vehicle.type.name === name.value)
            );

        const filteredByCountries = selectedCountries.length === 0
            ? allVehicles
            : allVehicles.filter(vehicle =>
                selectedCountries.some(country => vehicle.nation.name === country.value)
            );
        const filteredByLevels = selectedLevels.length === 0
            ? allVehicles
            : allVehicles.filter(vehicle =>
                selectedLevels.some(level => String(vehicle.level) === String(level.value))
            );

        const filtered = filteredByNames.filter(vehicle =>
            filteredByCountries.includes(vehicle)
        ).filter(vehicle =>
            filteredByLevels.includes(vehicle)
        );

        setFilteredVehicles(filtered);
    }, [selectedNames, selectedCountries, selectedLevels, allVehicles]);


    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const options: { value: string; label: string }[] = Array.from(
        new Set(allVehicles.map(vehicle => vehicle.nation.name))
    ).map(nationName => ({ value: nationName, label: nationName }));

    const namesOptions: { value: string; label: string }[] = Array.from(
        new Set(allVehicles.map(vehicle => vehicle.type.name))
    ).map(name => ({ value: name, label: name }));

    const levelsOptions: { value: string; label: string }[] = Array.from(
        new Set(allVehicles.map(vehicle => vehicle.level))
    ).map(name => ({ value: String(name), label: String(name) }));

    return (
        <div className={style.main}>
            <nav>
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Filter by country"
                    options={options}
                    onChange={(values: Option[]) => setSelectedCountries(values)}
                />
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Filter by name"
                    options={namesOptions}
                    onChange={(values: Option[]) => setSelectedNames(values)}
                />
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Filter by level"
                    options={levelsOptions.sort((a: Option, b: Option) => parseInt(a.value) - parseInt(b.value))}
                    onChange={(values: Option[]) => setSelectedLevels(values)}
                />
                {selectedCountries.length > 0 && (
                    <div>
                        <p>Selected countries:</p>
                        <ul>
                            {selectedCountries.map((country, index) => (
                                <li key={index}>{country.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedNames.length > 0 && (
                    <div>
                        <p>Selected names:</p>
                        <ul>
                            {selectedNames.map((name, index) => (
                                <li key={index}>{name.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedLevels.length > 0 && (
                    <div>
                        <p>Selected levels:</p>
                        <ul>
                            {selectedLevels.map((name, index) => (
                                <li key={index}>{name.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
            <div className={style.vehicles}>
            <ul>
                {filteredVehicles.map((vehicle, index) => (
                    <li key={index}>
                        <VehicleCard vehicle={vehicle} />
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default MainPage;
