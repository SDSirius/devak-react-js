import { useEffect, useState } from 'react';
import { CarServices } from "../../services/CarServices"

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

export const MostViewed = () => {
    const [car, setCar] = useState<Car[] | Car>([]);
    const carServices = new CarServices();

    useEffect(() => {
        const getCar = async () => {
            const response = await carServices.find('');

            setCar(response.data);
            console.log(car)
        };

        getCar();
    }, []);

    if (!car) {
        return <p>Não há carros a exibir</p>;
    }

    const renderCars = () => {
        if (Array.isArray(car) && car.length > 1) {
            const filteredCars = car.filter((result) => result.views > 0);
    
            return filteredCars
                .sort((a, b) => b.views - a.views)
                .map((result) => (
                    <div className='most-viewed-cars' key={result._id}>
                        <img src={result.file} alt={result.name} />
                        <p>{result.name},{result.yearModel}</p>
                    </div>
                ));
        } else if (car && !Array.isArray(car)) {
            return <h1>R$ {car.value}</h1>;
        }
    
        return null;
    };

    return <div className='container-most-views'>{renderCars()}</div>;
};
