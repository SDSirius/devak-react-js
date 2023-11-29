import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { SearchResults } from '../components/general/SearchResults';
import { Footer } from '../components/general/Footer';
import { UserServices } from '../services/UserServices';
import { Header } from '../components/general/Header';

 
interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export const UserView = () => {

    const routeParams = useParams<{ id: string }>();
    const userId = routeParams.id ?? '';
    const [user, setUser] = useState<User>({
        id: '',
        name: '',
        email: '',
        avatar: ''
    });
    const userServices = new UserServices();

    useEffect(() => {
        const getUser = async () => {
            const response = await userServices.find(userId);
            setUser(response.data);
        
        };

        getUser();
    }, []);

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Header />
            <div className='main-area'>
                <SearchResults results={user} /> 
            </div> 
            <Footer /> 
        </>
        
        )
};
