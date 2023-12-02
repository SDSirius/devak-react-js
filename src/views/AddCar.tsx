import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { UploadImage } from "../components/general/UploadImage";
import { PublicInput } from "../components/general/PublicInput";
import { Footer } from '../components/general/Footer';
import { Header } from '../components/general/Header';
import { SearchProvider } from '../components/general/SearchContext';
import { CarServices } from "../services/CarServices";

import  idCar  from '../assets/images/ID.jpg';
import  valueCar  from '../assets/images/Icone-cifrao.jpg';
import  yearCar  from '../assets/images/calendário.jpg';
import  picCar  from '../assets/images/icone_imagem.png';
import  brandCar  from '../assets/images/logos.png';
import  colorCar  from '../assets/images/paleta.png';
import  kmCar  from '../assets/images/velocimetro.png';
import  plateCar  from '../assets/images/placa.png';



export const AddCar = () => {

    const carServices = new CarServices();

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [image, setImage] = useState<{ preview: string; file: File | null }>({ preview: '', file: null });
    const [name,setName] = useState('');
    const [brand,setBrand] = useState('');
    const [yearModel,setYearModel] = useState('');
    const [value, setValue] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [color,setColor] = useState('');
    const [plate,setPlate] = useState('');
    const [loading, setLoading] = useState(false);

    const myId = localStorage.getItem("id" || "");

    if (!myId || myId.length < 1){

        navigate('/login');
    }
    
    const insertCar = async () => {
        try {
            const formData = new FormData();
            setError('');

            const numericValue = parseFloat(value) as number;
            const numericKilometers = parseFloat(kilometers) as number;

            if(!name || name.trim().length< 2){
                return setError('Favor fornecer um nome corretamente');
            }
            
            if(!brand || brand.trim().length< 2){
                return setError('Favor fornecer a marca corretamente');
            }
    
            if(!color || color.trim().length< 2){
                return setError('Favor fornecer uma cor corretamente');
            }
    
            if(!plate || plate.trim().length< 2){
                return setError('forneça a numeração da placa corretamente');
            }

            if (isNaN(numericValue) || isNaN(numericKilometers)) {
                return setError('Forneça valores válidos para Valor e Quilometragem.');
            }
            
            if(!yearModel || yearModel.trim().length< 2){
                return setError('Favor fornecer um modelo corretamente');
            }
            
            if(!image ){
                return setError('Selecione uma foto do veículo.');
            }

            formData.append('name', name);
            formData.append('brand',brand);
            formData.append('color', color);
            formData.append('plate', plate);
            formData.append('file', image.file as Blob);
            formData.append('value', typeof numericValue === 'number' ? String(numericValue) : '');
            formData.append('kilometers', typeof numericKilometers === 'number' ? String(numericKilometers) : '');

            formData.append('yearModel', yearModel);
            
            setLoading(true);
            await carServices.insertCar(formData);
            setLoading(false);
            navigate('/');
                
        } catch (e:any) {
            if (e?.response?.data?.message){
                return setError(e?.response?.data?.message)
            }
            return setError("Erro ao cadatrar veículo, tente novamente.")
        }
    }


    return (
            <SearchProvider>
                <Header />
                <div className="container-addcar">
                    <UploadImage image={image} imagemPreviewClassName="avatar avatarPreview" imagemPreview={image.preview || picCar} setImage={setImage} />
                    <div className="container-insert-car">
                    <h1>Hora de vender o seu carro!</h1>
                        <PublicInput 
                            icon={idCar}
                            alt='Nome'
                            name='Nome'
                            type='text'
                            modelValue={name}
                            setValue={setName}
                        />
                        <PublicInput 
                            icon={brandCar}
                            alt='Marca'
                            name='Marca'
                            type='text'
                            modelValue={brand}
                            setValue={setBrand}
                        />
                        <PublicInput 
                            icon={colorCar}
                            alt='Cor'
                            name='Cor'
                            type='text'
                            modelValue={color}
                            setValue={setColor}
                        />
                        <PublicInput 
                            icon={yearCar}
                            alt='Ano'
                            name='Ano'
                            type='text'
                            modelValue={yearModel}
                            setValue={setYearModel}
                        />
                        <PublicInput 
                            icon={valueCar}
                            alt='Valor'
                            name='Valor'
                            type='text'
                            modelValue={value}
                            setValue={setValue}
                        />
                        <PublicInput 
                            icon={kmCar}
                            alt='Quilometragem'
                            name='Quilometragem'
                            type='text'
                            modelValue={kilometers}
                            setValue={setKilometers}
                        />
                        <PublicInput 
                            icon={plateCar}
                            alt='Placa'
                            name='Placa'
                            type='text'
                            modelValue={plate}
                            setValue={setPlate}
                        />

                        <button type="button" onClick={insertCar} disabled={loading}>
                            {loading ? 'Cadastrando...' : 'Cadastrar!'} 

                        </button>
                    </div>
                </div>
                <Footer />
        </SearchProvider>
    )
}
