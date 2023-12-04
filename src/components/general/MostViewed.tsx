import { useEffect, useState } from 'react';
import { CarServices } from "../../services/CarServices"
import { useNavigate } from 'react-router-dom';

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
    const [cars, setCars] = useState<Car[]>([]);
    

    const carServices = new CarServices();
    const navigate = useNavigate();

    const goToCar = (_id:string) => {
        navigate(`/carView/${_id}`);
    }

    useEffect(() => {
        const getCars = async () => {
            const response = await carServices.find('');
            const filteredCars = response.data.filter((result:Car) => result.views > 0);
            setCars(filteredCars);
        };

        getCars();
    }, []);

    if (!cars) {
        return <p>Não há carros a exibir</p>;
    }

    const renderCars = () => {
        if (Array.isArray(cars) && cars.length > 0) {

            return (
            <div className='container-results'>
              {cars
                .sort((a, b) => b.views - a.views)
                .map((result) => (
                  <div className='most-viewed-cars' key={result._id} onClick={() => goToCar(result._id)}>
                    <img src={result.file} alt={result.name} />
                    <p>{result.name},{result.yearModel}</p>
                  </div>
                ))}
            </div>
          );
        }
    
        return null;
      };

    return (
        <>
            <div className='container-most-views'>
                <p > Top {cars.length > 20 ? "20" : cars.length} carros</p>
                {renderCars()}
            </div>
        </>
    );
};
