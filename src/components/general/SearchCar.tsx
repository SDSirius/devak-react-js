import { useState } from 'react';
import imgLupa from '../../assets/images/lupaPesquisas.svg';
import { CarServices } from '../../services/CarServices';

interface Car {
    id: string;
    name: string;
    file:string;

  }

interface SearchCarProps {
    onSearchComplete: (results: any[]) => void; 
}

export const SearchCar: React.FC<SearchCarProps> = ({ onSearchComplete }) => {
    const carService = new CarServices();
    const [searchTerm, setSearchTerm] = useState('');
  
    const onTyping = (e:any) => {
        setSearchTerm(e.target.value)
        handleSearch(searchTerm)
    }

    const handleSearch = async (searchTerm: string) => {
        try {
            if (searchTerm.length < 2) {
                return;
            }
    
            const response = await carService.find(searchTerm);
            const searchResults: Car[] = response.data;
            onSearchComplete(searchResults);
        } catch (error) {
            console.log("Erro ao pesquisar carro: ", error);
        }
    };

    return (
      <div className="search-bar">
        <img src={imgLupa} alt="Ícone de lupa" />
        <input
          type="text"
          value={searchTerm}
          placeholder="Busque o seu carro ideal"
          onChange={onTyping}
        />
      </div>
  );
};