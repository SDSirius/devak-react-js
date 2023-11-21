import homeIcon from '../../assets/images/home.svg';
import homeActiveIcon from '../../assets/images/home_active.svg';
import linkIcon from '../../assets/images/link.svg';
import linkActiveIcon from '../../assets/images/link_active.svg';
import avatarIcon from '../../assets/images/avatar.svg';
import { useLocation, useNavigate } from 'react-router-dom';


export const Navigation = ( ) => {

    const navigate = useNavigate();
    const location = useLocation();
    const  id  = localStorage.getItem('id' || '');
    const idExists = id && id.length > 0;
    const mobile = window.innerWidth <= 992;
    
    
    const navigateToUserOrLogin = () => {
        const path = idExists ? '/user' : '/login';
        navigate(path);
      };
    

    const getIcon = (name: string) => {
        switch (name) {
          case 'home':
            if (location.pathname !== '/user' && location.pathname !== '/link' && location.pathname !== '/room') {
              return homeActiveIcon;
            }
            return homeIcon;
          case 'room':
            if (location.pathname === '/room' || location.pathname === '/link') {
              return linkActiveIcon;
            }
            return linkIcon;
          default:
            return '';
        }
      };

    const getSelectedClass = () => {
        if (location.pathname === '/user'){
            return 'selected';
        }
        return ''
    }

    const avatarImage = () => {
        const avatar = localStorage.getItem('avatar')
        if (!avatar){
            return avatarIcon
        }
        return avatar
    }

    return (
        <div className='container-navigation'>
            <ul>
                <li>
                    <img src={getIcon('home')} alt='Home' className='iconNav' onClick={() => navigate('/')}/>
                </li>
                {mobile ? <li>
                    <img src={getIcon('room')} alt='Entrar na reunião' className='iconNav' onClick={() => navigate('/link')}/>
                </li> 
                :
                <li className="disabled">
                    <img src={getIcon('room')} alt='Entrar na reunião' className='iconNav' />
                </li> }
                
                <li>
                    <div className={'avatar mini ' + getSelectedClass()} >
                        <img src={avatarImage()} alt='Editar usuario' onClick={navigateToUserOrLogin} />
                    </div>
                </li>
            </ul>

        </div>
    );
}