import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { CarServices } from "../services/CarServices"
import { SearchResults } from '../components/general/SearchResults';
import { Header } from '../components/general/Header';
import { MostViewed } from '../components/general/MostViewed';
import { Footer } from '../components/general/Footer';


interface Car {
    views:number;
    _id: string;
    user:string;
    value: number;
    file: string;
    brand: string;
    name: string;
    color: string;
    yearModel: string;
    kilometers: string;
    plate: string;
    sold?: string;
}

export const CarView = () => {
    const routeParams = useParams<{ id: string }>();
    const carId = routeParams.id ?? '';
    const [car, setCar] = useState<Car>({
        views: 0,
        _id: '',
        user: '',
        value: 0,
        file: '',
        brand: '',
        name: '',
        color: '',
        yearModel: '',
        kilometers: '',
        plate: '',
    });
    const carServices = new CarServices();
    
    const getCar = async () => {
        const response = await carServices.findById(carId);
        setCar(response.data);
    };

    useEffect(() => {
        getCar();
    }, []);

    if (!car) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Header />
            <div className='main-area'>
                <SearchResults results={car} /> 
            </div> 
            <Footer /> 
        </>
    )
}
