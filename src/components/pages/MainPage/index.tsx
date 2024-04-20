import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../../redux/features/vehiclesSlice";
import { RootState } from "../../../store";
import VehicleCard from "../../VehicleCard";
import Dropdown from "../../Dropdown";

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
    const [filteredVehicles, setFilteredVehicles] = useState(allVehicles);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchVehicles());
        }
    }, [status, dispatch]);

    useEffect(() => {
        const filtered = selectedCountries.length === 0
            ? allVehicles
            : allVehicles.filter(vehicle =>
                selectedCountries.some(country => vehicle.nation.name === country.value)
            );
        setFilteredVehicles(filtered);
    }, [selectedCountries, allVehicles]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const options: { value: string; label: string }[] = Array.from(
        new Set(allVehicles.map(vehicle => vehicle.nation.name))
    ).map(nationName => ({ value: nationName, label: nationName }));

    return (
        <div>
            <h1>Main Page</h1>
            <Dropdown
                isSearchable
                isMulti
                placeHolder="Filter by country"
                options={options}
                onChange={(values: Option[]) => setSelectedCountries(values)}
            />
            <p>{Math.max(...filteredVehicles.map(vehicle => vehicle.level))}</p>
            {selectedCountries.length > 0 && (
                <div>
                    <p>Selected countries:</p>
                    <ul>
                        {selectedCountries.map((country, index) => (
                            <li key={index}>{country.label}</li>
                        ))}
                    </ul>
                </div>
            )}
            <ul>
                {filteredVehicles.map((vehicle, index) => (
                    <li key={index}>
                        <VehicleCard vehicle={vehicle} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainPage;
