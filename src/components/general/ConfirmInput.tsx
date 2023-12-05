import { Modal } from 'react-bootstrap';

interface ConfirmationInputProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}
export const ConfirmationInput: React.FC<ConfirmationInputProps> = ({ isOpen, onCancel, onConfirm }) => {
  
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      show={isOpen}
      onHide={onCancel}
      className='container-modal'
      >
      <Modal.Body>
        <div className="modal-overlay">
          <div className="modal" style={{ zIndex: 1000 }}>
            <p>Tem certeza que deseja excluir este carro?</p>
            <div className='delete-choice'>
              <button className='button-confirm' onClick={() => onConfirm() }>Confirmar</button>
              <button className='button-cancel' onClick={() => onCancel()}>Cancelar</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
