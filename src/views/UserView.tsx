import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { SearchResults } from '../components/general/SearchResults';
import { MostViewed } from '../components/general/MostViewed';
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
    console.log(userId)
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
            // console.log(userId)
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
            <h1>{user.name}</h1>
            {/* <FiltersMenu onUpdateResults={handleSearchComplete} setResults={setResults} /> */}
            <div className='main-area'>
                <div className='upper-main'>
                {/* <SearchCar onSearchComplete={handleSearchComplete} /> */}
                    <MostViewed /> 
                </div> 
                <SearchResults results={user} /> 
            </div> 
            <Footer /> 
        </>
        
        )
};
