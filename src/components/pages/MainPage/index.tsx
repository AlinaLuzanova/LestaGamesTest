import  { useEffect, useState, useCallback, useMemo, FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../../../redux/features/vehiclesSlice';
import { RootState } from '../../../store';
import VehicleCard from '../../VehicleCard';
import Dropdown from '../../Dropdown';
import style from './style.module.less';
import Pagination from '../../Pagination';
import gsap from 'gsap';

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
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestedNames, setSuggestedNames] = useState<string[]>([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchVehicles());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setSuggestedNames(
            allVehicles
                .map(vehicle => vehicle.name)
                .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, allVehicles]);

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

        let filtered = filteredByNames.filter(vehicle =>
            filteredByCountries.includes(vehicle)
        ).filter(vehicle =>
            filteredByLevels.includes(vehicle)
        );

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(vehicle =>
                vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredVehicles(filtered);
    }, [selectedNames, selectedCountries, selectedLevels, allVehicles, searchTerm]);

    const handleNextPageClick = useCallback(() => {
        setPage(prev => Math.min(prev + 1, Math.ceil(filteredVehicles.length / 27)));
    }, [filteredVehicles]);

    const handlePrevPageClick = useCallback(() => {
        setPage(prev => Math.max(prev - 1, 1));
    }, []);

    const options = useMemo(() => {
        return Array.from(new Set(allVehicles.map(vehicle => vehicle.nation.name)))
            .map(nationName => ({ value: nationName, label: nationName }));
    }, [allVehicles]);

    const namesOptions = useMemo(() => {
        return Array.from(new Set(allVehicles.map(vehicle => vehicle.type.name)))
            .map(name => ({ value: name, label: name }));
    }, [allVehicles]);

    const levelsOptions = useMemo(() => {
        return Array.from(new Set(allVehicles.map(vehicle => vehicle.level)))
            .map(name => ({ value: String(name), label: String(name) }))
            .sort((a, b) => parseInt(a.value) - parseInt(b.value));
    }, [allVehicles]);

    const vehiclesToShow = useMemo(() => {
        return filteredVehicles.slice((page - 1) * 27, page * 27);
    }, [filteredVehicles, page]);

    useEffect(() => {
        gsap.from(".ul", {
            x: '100',
            y: '40',
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: .5
        });
    }, [filteredVehicles,page]);
    useEffect(() => {
        gsap.from("#header", {
            y:-1000,
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 1
        });
    }, []);

    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    };

    return (
        <div className={style.main}>
            <nav>
                <form className={style.searchForm} onSubmit={(e) => e.preventDefault()}>
                    <input
                        placeholder='Enter name of the ship'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Filter by nation"
                    options={options}
                    onChange={(values: Option[]) => setSelectedCountries(values)}
                />
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Filter by class"
                    options={namesOptions}
                    onChange={(values: Option[]) => setSelectedNames(values)}
                />
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Filter by level"
                    options={levelsOptions}
                    onChange={(values: Option[]) => setSelectedLevels(values)}
                />
                {selectedCountries.length > 0 && (
                    <div className={style.selected}>
                        <p>Selected countries:</p>
                        <ul>
                            {selectedCountries.map((country, index) => (
                                <li key={index}>{country.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedNames.length > 0 && (
                    <div className={style.selected}>
                        <p>Selected names:</p>
                        <ul>
                            {selectedNames.map((name, index) => (
                                <li key={index}>{name.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedLevels.length > 0 && (
                    <div className={style.selected}>
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
                <header id='header'>
                    <Link to='https://korabli.su/' style={{textDecoration: 'none'}}><h1>МИР КОРАБЛЕЙ</h1></Link>
                    <h4>обзор</h4>
                    <h3>Добро пожаловать на Стену Кораблей, где вы можете погрузиться в обилие морских судов игры «Мир
                        Кораблей». Здесь вы найдете полный ассортимент кораблей, доступных в игре, с возможностью
                        фильтрации по различным параметрам.</h3>
                </header>
                <Pagination
                    onNextPageClick={handleNextPageClick}
                    onPrevPageClick={handlePrevPageClick}
                    disable={{
                        left: page === 1,
                        right: page === Math.ceil(filteredVehicles.length / 27),
                    }}
                    nav={{current: page, total: Math.ceil(filteredVehicles.length / 27)}}
                />
                {vehiclesToShow.length > 0 ? (
                    <ul className='ul'>
                        {vehiclesToShow.map((vehicle, index) => (
                            <li key={index}>
                                <VehicleCard vehicle={vehicle}/>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h3 style={{marginLeft: '20px'}}>No vehicles with that settings! Try again</h3>
                )}
                <Pagination
                    onNextPageClick={handleNextPageClick}
                    onPrevPageClick={handlePrevPageClick}
                    disable={{
                        left: page === 1,
                        right: page === Math.ceil(filteredVehicles.length / 27),
                    }}
                    nav={{current: page, total: Math.ceil(filteredVehicles.length / 27)}}
                />
                <footer><Link to='https://github.com/AlinaLuzanova'>created by Alina Luzanova</Link></footer>
            </div>
        </div>
    );
};

export default MainPage;
