import "../../landingPage/pages/LandingPage.css";
import "../../classes/components/cards/cards.css";
import "./Form.css";
import Input from "../Input/Input";
import Button from "../button/Button";

interface Props {
  handleClick: () => void;
}
const Form = (props: Props) => {
  return (
    <>
      <div className="modal-wrapper" onClick={props.handleClick}></div>
      <form className="card form">
        <Input type="text" placeholder="ClassName" element="input" />
        <Input type="text" placeholder="Section" element="input" />
        <Input type="text" placeholder="class code" element="input" />
        <Button inverse>Click</Button>
      </form>
    </>
  );
};

export default Form;
