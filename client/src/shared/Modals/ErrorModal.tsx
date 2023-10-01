import Modal from "./Modal";
import Button from "../button/Button";

interface props {
  error: string;
  onClear: any;
}

const ErrorModal = (props: props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
