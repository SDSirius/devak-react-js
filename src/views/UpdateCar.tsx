import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
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



export const UpdateCar = () => {
    const routeParams = useParams<{ id: string }>();
    const carId = routeParams.id ?? '';

    const carServices = new CarServices();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [image, setImage] = useState<any>('');
    const [name,setName] = useState('');
    const [brand,setBrand] = useState('');
    const [yearModel,setYearModel] = useState('');
    const [value, setValue] = useState('');
    const [kilometers,setKilometers] = useState('');
    const [color,setColor] = useState('');
    const [plate,setPlate] = useState('');
    const [loading, setLoading] = useState(false);

    const myId = localStorage.getItem("id" || "");

    if (!myId || myId.length < 1){

        navigate('/login');
    }

    useEffect(() => {
        const fetchCarDetails = async () => {
          try {
            const response = await carServices.findById(carId);
            const carDetails = response.data;
            
            setName(carDetails.name);
            setBrand(carDetails.brand);
            setYearModel(carDetails.yearModel);
            setValue(carDetails.value);
            setKilometers(carDetails.kilometers);
            setColor(carDetails.color);
            setPlate(carDetails.plate);
            setImage(carDetails.file);
    
            if (carDetails.file) {
              setImage({ preview: carDetails.file, file: null });
            }
          } catch (error) {
            console.error('Erro ao buscar detalhes do carro:', error);
          }
        };
        fetchCarDetails();
    }, [carId]);
    
    const updateCar = async () => {
        try {
            const formData = new FormData();
            setError('');

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

            if(!value || value.trim().length< 2){
                return setError('Favor fornecer um valor corretamente');
            }
    
            if(!kilometers || kilometers.trim().length< 2){
                return setError('Favor fornecer um valor para quilometragem');
            }
            
            if(!yearModel || yearModel.trim().length< 2){
                return setError('Favor fornecer um modelo corretamente');
            }
            
            if(!image ){
                return setError('Selecione uma foto do veículo.');
            }
            

            formData.append('name', name);
            formData.append('brand', brand);
            formData.append('color', color);
            formData.append('plate', plate);
            formData.append('value', value);
            formData.append('kilometers', kilometers);
            formData.append('yearModel', yearModel);


    // Adiciona a nova imagem apenas se for selecionada
            if (image.file) {
                formData.append('file', image.file as Blob);
            }

            setLoading(true);
            await carServices.updateCar(carId, formData);
            setLoading(false);
            navigate(`/carView/${carId}`);
                        
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
                <div className="container-update-car">
                    <h1>Errou alguma coisa? Não se preoculpe. Atualize os dados agora!</h1>
                    <UploadImage image={image} imagemPreviewClassName="avatar avatarPreview" imagemPreview={image.preview || picCar} setImage={setImage} />
                    <div className="container-edit-car">
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

                        <button type="button" onClick={updateCar} disabled={loading}>
                            {loading ? 'Atualizando...' : 'Atualizar Dados!'} 

                        </button>
                    </div>
                </div>
                <Footer />
        </SearchProvider>
    )
}
