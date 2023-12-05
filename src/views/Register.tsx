import { useState } from "react";
import { PublicInput } from '../components/general/PublicInput';
import { Link, useNavigate } from 'react-router-dom';
import { UploadImage } from "../components/general/UploadImage";
import { RegisterServices } from "../services/RegisterServices";

import logo from '../assets/images/Sem-título.svg'
import imgEmail from '../assets/images/mail.svg'
import imgKey from '../assets/images/key.svg'
import imgUser from '../assets/images/user.svg'



const registerServices = new RegisterServices(); 

export const Register = () => {

    const [image, setImage] = useState<{ preview: string; file: File | null }>({ preview: '', file: null });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const doRegister = async () => {
        try {
            setError('')            
            if(!image 
                || !name || name.trim().length < 2 
                || !email || email.trim().length < 5 
                || !password || password.trim().length < 4
                || !confirm || confirm.trim().length < 4) {
                return setError('Favor preencher os campos corretamente')  
            }
            if (password !== confirm){
                return setError("Senha e confirmação de senha não coincidem.")
            }
            
            setLoading(true);
    
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('file', image.file as Blob);
            
            await registerServices.register(formData);
            setLoading(false);
    
            console.log("Cadastro realizado com Sucesso!");
            return navigate('/?success=true');
        } catch (e:any) {
            console.log("Erro ao efetuar cadastro", e);
            setLoading(false);
            if (e?.response?.data?.message){
                return setError(e?.response?.data?.message);
            }
            return setError("Erro ao efetuar o Cadastro, tente novamente.");
        }
    }
    

    return  (
        <div className="container-public register">
            <img src={logo} alt="Logo Devameet" className='logo' onClick={() => navigate('/')}/>
            <form>
                <UploadImage image={image} imagemPreviewClassName="avatar avatarPreview" imagemPreview={image?.preview || imgUser} setImage={setImage} />
                {/* <AvatarInput image={image} setImage={setImage}/> */}
                {error && <p className="error">{error}</p>}
                <PublicInput  icon={imgUser} alt='Nome' name='Nome' type='text' modelValue={name} setValue={setName}/>
                <PublicInput icon={imgEmail} alt='Email' name='Email' type='text' modelValue={email} setValue={setEmail}/>
                <PublicInput icon={imgKey} alt='Senha' name='Senha' type='password' modelValue={password} setValue={setPassword}/>
                <PublicInput icon={imgKey} alt='Confirma senha' name='Confirma senha' type='password' modelValue={confirm} setValue={setConfirm}/>
                
                <button type='button' onClick={doRegister} disabled={loading}> 
                    {loading ? 'Carregando' : 'Cadastrar.'}
                </button>

                <div className='link'>
                    <p>Ja possui uma conta?</p>
                    <Link to="/login" >Faça seu Login agora!</Link>
                </div>
            </form>
        </div>

    );
}