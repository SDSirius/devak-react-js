import { ActionHeader } from "../components/general/ActionHeader";
// import { AvatarInput } from "../components/general/AvatarInput";
import { Footer } from "../components/general/Footer";
import { Header } from "../components/general/Header";
import { useState, useContext } from 'react';
import clearIcon from '../assets/images/clear.svg';
import logoutIcon from '../assets/images/logout.svg';
import { LoginServices } from "../services/LoginServices";
import { useNavigate } from "react-router-dom";
import { AuthorizeContext } from "../App";
import { UserServices } from "../services/UserServices";
import { UploadImage } from "../components/general/UploadImage";
import imgUser from '../assets/images/user.svg'
import { CarServices } from "../services/CarServices";

const loginServices = new LoginServices();
const userServices = new UserServices();
const carServices = new CarServices();

export const Profile = () => {

    const navigate = useNavigate();
    const { setToken } = useContext(AuthorizeContext);
    const [name, setName]=useState(localStorage.getItem('name') || '');
    const [image, setImage] = useState<{ preview: string; file: File | null }>({ preview: '', file: null });
    const  myId  = localStorage.getItem('id' || '');
    const mobile = window.innerWidth <= 992;
    

    
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
            console.log(image.preview)

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
    

    const myCars = async () => {
        if (!myId || myId.length < 1){
            return
        }
        const result = await carServices.findByUser(myId);
        return result.data;
    }


    return (
        <>
            {!mobile && <Header /> }
            <div className="container-profile">
                <ActionHeader actionCallback={finishUpdate} disabled={!name}/>
                <UploadImage image={image} imagemPreviewClassName="avatar avatarPreview" imagemPreview={image.preview || imgUser} setImage={setImage} />
                <div className="input">
                    <div>
                        <span >Nome</span>
                        <input type="text" placeholder="Informe seu nome" value={name} onChange={e => setName(e.target.value)} />
                        {name && <img src={clearIcon} alt="Limpar edição" onClick={() => setName('')}/>}
                    </div>
                </div>
                <div className="container-my-cars">
                     <span onClick={() => myCars}>Meus Veículos</span>
                </div>
                <div className="logout">
                    <div onClick={logout}>
                        <img src={logoutIcon} alt="sair"/>
                        <span >Sair</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}