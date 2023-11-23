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
        console.log("carId do getCar",carId)
        const response = await carServices.findById(carId);
        console.log(response.data)
        setCar(response.data);
    };

    useEffect(() => {
        getCar();
        }, []);

        return (
            <>
                <Header />
                <h1>{car.name}</h1>
                {/* <FiltersMenu onUpdateResults={handleSearchComplete} setResults={setResults} /> */}
                <div className='main-area'>
                    <div className='upper-main'>
                    {/* <SearchCar onSearchComplete={handleSearchComplete} /> */}
                        <MostViewed /> 
                    </div> 
                    <SearchResults results={car} /> 
                </div> 
                <Footer /> 
            </>
            
            )

}




// import { Header } from '../components/general/Header';
// import { FiltersMenu } from '../components/filters/FiltersMenu';
// import { SearchCar } from '../components/general/SearchCar';
// import { MostViewed } from '../components/general/MostViewed';
// import { Footer } from '../components/general/Footer';




//     const getCarID = () => {
//         const routeParams = useParams();
//         console.log(routeParams)
//         return routeParams ;
//     };

//     const carId = getCarID()._id?.toString();

//     console.log("id recebido no carView",carId)
//     const [searchResults, setSearchResults] = useState([]);
//     const [results, setResults ] = useState([]);
    


//     const handleSearchComplete = (results:any) => {
//         setSearchResults(results);
//     };
    
//     

//     return (
//         <div>
//             {/* <Header />
//             <FiltersMenu onUpdateResults={handleSearchComplete} setResults={setResults} />
//             <div className='main-area'>
//                 <div className='upper-main'>
//                     <SearchCar onSearchComplete={handleSearchComplete} />
//                     <MostViewed /> */}
//                 {/* </div> */}
//                 {/* <SearchResults results={car} /> */}
//             {/* //     </div> */}
//             // {/* Renderiza searchResults se houver, caso contrário, renderiza os 10 primeiros carros */}
//             {/* // <Footer /> */}
//         </div>
//     )

// }



// interface CarViewProps {
//     _id: string;
// }


// export const CarView: React.FC<CarViewProps> = ({ _id }) => {



//     useEffect(() => {

//         getCar();
//     }, [_id]);

//     if (!car) {
//         return <div>Carregando...</div>;
//     }

//     return (
//         <div>
//             pagina do Carro {car.name}
//         </div>
//     )
// }