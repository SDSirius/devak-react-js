
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
    <div className="modal-overlay">
      <div className="modal">
        <p>Tem certeza que deseja excluir este carro?</p>
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onConfirm}>Confirmar</button>
      </div>
    </div>
  );
};