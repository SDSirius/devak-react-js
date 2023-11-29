import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Sem-título.svg';
import { Navigation } from './Navigation';


export const Header = () => {
    const navigate = useNavigate();
   
    const goHome = () => {
        navigate('/');
    }
    
    return (
        <div className="container-header">
            <img src={logo} alt='Logo Devameet' className='logo' onClick={() => goHome()}/>
            <Navigation />
        </div>
    )
}