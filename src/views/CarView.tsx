// import { useEffect, useState } from 'react';
// import { CarServices } from "../services/CarServices"

// interface CarViewProps {
//     _id: string;
// }

// interface Car {
//     views:number;
//     _id: number;
//     user:string;
//     value: number;
//     file: string;
//     brand: string;
//     name: string;
//     color: string;
//     yearModel: string;
//     kilometers: string;
//     plate: string;
//     sold?: string;
// }

// export const CarView: React.FC<CarViewProps> = ({ _id }) => {

//     const [car, setCar] = useState<Car | undefined>(undefined);
//     const carServices = new CarServices();

//     useEffect(() => {
//         const getCar = async () => {
//             const response = await carServices.find(_id);
//             setCar(response.data);
//         };

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