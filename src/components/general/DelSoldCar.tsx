import trashCan from '../../assets/images/trash.svg'
import { useState } from 'react';
import { ConfirmationInput } from './ConfirmInput';
import { CarServices } from '../../services/CarServices';


interface DeleteSoldCarProp {
    _id:string;
}

export const DeleteSoldCar:React.FC<DeleteSoldCarProp> = ({_id}) => {

    const carServices = new CarServices();
    const [confirm, setConfirm] = useState(false)
    

    const sellCar = () => {
        // Exibir o modal de confirmação
        setConfirm(true);
      };
    
      const handleCancel = () => {
        
        setConfirm(false);
      };
    
      const handleConfirm = async () => {
        try {
          await carServices.deleteCar(_id);
          setConfirm(false);
        } catch (error) {
          console.error("Erro ao deletar o carro:", error);
          setConfirm(false);
        }
      };

    return (
        <>
            <img className='delete-car' src={trashCan} onClick={() =>sellCar()}/>
            <ConfirmationInput isOpen={confirm} onCancel={handleCancel} onConfirm={handleConfirm}/>
        </>
    )

}