import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/images/Sem-título.svg';
import imgEmail from '../assets/images/mail.svg';
import imgKey from '../assets/images/key.svg';
import { PublicInput } from '../components/general/PublicInput';
import { LoginServices } from "../services/LoginServices";
import { AuthorizeContext } from "../App";

const loginservices = new LoginServices(); 

export const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');

    const { setToken } = useContext(AuthorizeContext)
    const navigate = useNavigate();

    const doLogin = async() =>{
        try {
            setError('')            
            if(!login || login.trim().length<5 || !password || password.trim().length < 4) {
                return setError('Favor preencher os campos corretamente');  
            }

            setLoading(true);
            await loginservices.login({login, password}, setToken)
            setLoading(false)

        } catch (e:any) {


            console.log("erro ao efetuar o login", e);
            setLoading(false);
            if (e?.response?.data?.message){
                return setError(e?.response?.data?.message)
            }
            return setError("Erro ao efetuar o Login, tente novamente.")
        }
    }

    return  (
        <div className="container-public">
            <img src={logo} alt="Logo Devameet" className='logo'  onClick={() => navigate('/')}/>
            <form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{'Cadastro efetuado com sucesso! Faça seu login'}</p>}

                <PublicInput 
                icon={imgEmail}
                alt='Email'
                name='Email'
                type='text'
                modelValue={login}
                setValue={setLogin}
                />
                <PublicInput 
                icon={imgKey}
                alt='Password'
                name='Password'
                type='password'
                modelValue={password}
                setValue={setPassword}
                />
                
                <button type='button' onClick={doLogin} disabled={loading}> 
                    {loading ? 'carregando' : 'Login.'} 
                </button>

                <div className='link'>
                    <p>Não tem uma conta?</p>
                    <Link to="/register">Faça seu cadastro agora!</Link>
                </div>
            </form>
        </div>

    );
}