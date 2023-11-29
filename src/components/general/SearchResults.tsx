import { useState, useEffect } from 'react';
import { CarServices } from "../../services/CarServices";
import { useNavigate } from "react-router-dom";


interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

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

interface SearchResultsProps {
    results: User | Car[] | Car;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    console.log("results do searchResults", results)

    const navigate = useNavigate();
    const [userCars, setUserCars] = useState<React.ReactNode | null>(null);
    const carServices = new CarServices();

    const goToUser = (_id:string) => {
        navigate(`/userView/${_id}`);
    }

    const goToCar = (_id:string) => {
        navigate(`/carView/${_id}`);
    }

    const getUserCars = async (id: string) => {
        try {
          const response = await carServices.findByUser(id);
          const data: Car[] = response.data;
      
          if (data && data.length > 0) {
            const userCarsElements = data
              .sort((a, b) => b.views - a.views)
              .map((userCar) => (
                <div key={userCar._id} className='cars-object' onClick={() => !userCar.sold ? goToCar(userCar._id) : alert("Carro já vendido")}>
                  <h1>{userCar.name} </h1>
                  <img src={userCar.file} alt={userCar.name} />
                  <p>
                    R$ {userCar.value} {userCar.sold ? ' Vendido' : 'Disponível'}
                  </p>
                </div>
              ));
      
            setUserCars(userCarsElements);
          } else {
            setUserCars(<p>Nenhum carro encontrado para este usuário.</p>);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          setUserCars(<p>Ocorreu um erro ao buscar dados do usuário.</p>);
        }
    };
      
    useEffect(() => {
        if ((results as User).email) {
            const user = results as User;
            getUserCars(user.id);
        }
    }, [results]);


    if (Array.isArray(results)) {
        return (
            <div className="container-cars">
                {results
                    .sort((a, b) => b.value - a.value)
                    .map((result) => (
                    <div key={result._id} className='cars-object' onClick={() => goToCar(result._id)} >
                        <p >R$ {result.value}</p>
                        <div className="container-cars-object" >
                            <div className='cars-id'>
                                <img className='exibit-cars' src={result.file} alt={`${result.brand} ${result.name}`} />
                                <p>Cor: {result.color}</p>
                                <p>Ano / Modelo: {result.yearModel}</p>
                            </div>
                            <div className="cars-specs">
                                <p> {result.brand} {result.name}</p>
                                <p>Quilometros: {result.kilometers}</p>
                                <p>Placa: {result.plate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if ((results as User).email) {
        const user = results as User;
        console.log("propriedades do usuário => ",user);
        return (
            <div className='user-object' >
                <h1>{user.name}</h1>
                <div className="container-user-object" >
                    <div className='user-id'>
                        <img className='exibit-user' src={user.avatar} alt={`${user.name}`} />
                    </div>
                    <div className="user-specs">
                        {userCars}
                    </div>
                </div>
            </div>
        )
    } else {
        const car = results as Car;
        console.log(car);
        return (
            <div className='car-object' >
                <h1>R$ {car.value}</h1>
                <div className="container-car-object" >
                    <div className='car-id'>
                        <img className='exibit-car' src={car.file} alt={`${car.brand} ${car.name}`} />
                        <p> {car.brand} {car.name}</p>
                    </div>
                    <div className="car-specs">
                        <p>Cor: {car.color}</p>
                        <p>Ano / Modelo: {car.yearModel}</p>
                        <p>Quilometros: {car.kilometers}</p>
                        <p>Placa: {car.plate}</p>
                        <p onClick={() => goToUser(car.user)}> Veja o Perfil do Vendedor!</p>
                    </div>
                </div>
            </div>
        )
    }
};
