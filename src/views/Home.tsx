import { useState, useEffect } from 'react';
import { Footer } from '../components/general/Footer';
import { Header } from '../components/general/Header';
import { SearchCar } from '../components/general/SearchCar';
import { FiltersMenu } from '../components/filters/FiltersMenu';
import { SearchResults } from '../components/general/SearchResults';
import { SearchProvider } from '../components/general/SearchContext';
import { CarServices } from '../services/CarServices';
import { MostViewed } from '../components/general/MostViewed';

export const Home = () => {

    console.log("está na home")
    const carServices = new CarServices();
    const [allCars, setAllCars] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [results, setResults ] = useState([]);



    const handleSearchComplete = (results:any) => {
        setSearchResults(results);
    };

    useEffect(() => {
        const getAllCars = async () => {
            try {
                const response = await carServices.find('');
                setAllCars(response.data);
            } catch (error) {
                console.error('Error fetching all cars:', error);
            }
        };
    
        if (searchResults.length === 0) {
            getAllCars();
        }
    }, []);

    return (
        <SearchProvider>
            <Header />
            <FiltersMenu onSearchComplete={handleSearchComplete}  />
            <div className='main-area'>
                <div className='upper-main'>
                    <SearchCar onSearchComplete={handleSearchComplete} />
                    <MostViewed />
                </div>
                <SearchResults results={searchResults.length > 0 ? searchResults : allCars.slice(0, 10) || results} /> 
            </div>
            <Footer />
        </SearchProvider>
    );
};

