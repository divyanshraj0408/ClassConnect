import Modal from "./Modal";
import Button from "../button/Button";

interface ErrorModalProps {
  error:   string | null;
  onClear: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClear }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;