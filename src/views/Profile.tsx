import { ActionHeader } from "../components/general/ActionHeader";
import { Footer } from "../components/general/Footer";
import { useState, useContext, useEffect } from 'react';
import { LoginServices } from "../services/LoginServices";
import { useNavigate } from "react-router-dom";
import { AuthorizeContext } from "../App";
import { UserServices } from "../services/UserServices";
import { UploadImage } from "../components/general/UploadImage";
import { CarServices } from "../services/CarServices";

import clearIcon from '../assets/images/clear.svg';
import logoutIcon from '../assets/images/logout.svg';
import imgUser from '../assets/images/user.svg'
import imgEdit from '../assets/images/edit.svg'
import { DeleteSoldCar } from "../components/general/DelSoldCar";


interface Car {
    _id: string;
    file: string;
    brand: string;
    name: string;
    yearModel: string;
    sold?: string;
}

const loginServices = new LoginServices();
const userServices = new UserServices();
const carServices = new CarServices();

export const Profile = () => {

    const navigate = useNavigate();

    const myAvatar = localStorage.getItem('avatar' || '')
    const [cars, setCars] = useState([]);
    const { setToken } = useContext(AuthorizeContext);
    const [name, setName]=useState(localStorage.getItem('name') || '');
    const [image, setImage] = useState<{ preview: string; file: File | null }>({ preview: myAvatar as string, file: null });
    const  myId  = localStorage.getItem('id' || '');
    
    const editCar = (_id:string) => {
        navigate(`/UpdateCar/${_id}`);
    }

    const goToCar = (_id:string) => {
        navigate(`/carView/${_id}`);
    }
    
    const finishUpdate = async () =>{
        try {
            const formData = new FormData();
            if(!name || name.trim().length< 2){
                return;
            }
            formData.append('name', name);
            // const body = { name } as any;
            
            
            if ( image ) {
                // body.file = image.file;
                formData.append('file', image.file as Blob);
            }


            
            await userServices.update(formData);

            localStorage.setItem('name', name);
            if (image){
                
                localStorage.setItem('avatar', image.preview);
            }

            return navigate(-1);
            } catch (e:any) {
            if(e?.response?.data?.message){
                console.log( "Erro ao atualizar dados de usuario", e?.response?.data?.message);
            }else{
                console.log( "Erro ao atualizar dados de usuario", e);
            }
        }
        
    }
    
    const logout = async () =>{
        loginServices.logout(setToken);
        navigate('');
    }

    const renderList = ( cars: Car[] ) => {
        if (cars) {
            return (
                cars.map((car) => (
                    <div className="car-name" key={car._id} >
                        <img onClick={() => !car.sold ? goToCar(car._id) : alert("Carro já vendido")} className="imagem-mini" src={car.file}/> 
                        <p onClick={() => !car.sold ? goToCar(car._id) : alert("Carro já vendido")}>{car.brand} {car.name}, {car.yearModel} : {car.sold ? ' Vendido' : 'Disponível'}</p>
                        {!car.sold ? <img className="edit-car" src={imgEdit} onClick={() => editCar(car._id)}/> : "" }
                        {!car.sold ? <DeleteSoldCar _id={car._id} /> : "" }
                        
                    </div>

                ))
            )
        }
    }
    useEffect(() => {
        const myCars = async () => {
            if (!myId || myId.length < 1){
                return null;
            }

            try {
                const result = await carServices.findByUser(myId);
                return result.data;
            } catch (error) {
                console.error("Erro ao buscar carros:", error);
                return null;
            }
        };

        const getMyCars = async () => {
            const response  = await myCars();
            setCars(response)

        }
        
        getMyCars();
    }, []);


    return (
        <>
            <div className="container-profile">
                <ActionHeader actionCallback={finishUpdate} disabled={!name}/>
                <UploadImage image={image} imagemPreviewClassName="avatar avatarPreview" imagemPreview={image.preview || imgUser} setImage={setImage} />
                <div className="input">
                    <div>
                        <span>Nome</span>
                        <input type="text" placeholder="Informe seu nome" value={name} onChange={e => setName(e.target.value)} />
                        {name && <img src={clearIcon} alt="Limpar edição" onClick={() => setName('')}/>}
                    </div>
                </div>
                <div className="container-my-cars">
                     <span>Meus Veículos</span>
                     <div className="my-cars">{renderList(cars)}</div>
                </div>
                <div className="logout">
                    <div onClick={logout}>
                        <img src={logoutIcon} alt="sair"/>
                        <span>Sair</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}