import "../../landingPage/pages/LandingPage.css";
import "../../classes/components/cards/cards.css";
import "./Form.css";
import Input from "../Input/Input";
import Button from "../button/Button";

interface Props {
  handleClick: () => void;
  noOfInputs: Array<string>;
}
const Form = (props: Props) => {
  return (
    <>
      <div className="modal-wrapper" onClick={props.handleClick}></div>
      <form className="card form">
        {props.noOfInputs.map((input) => (
          <Input key={input} element="input" placeholder={input} type="text" />
        ))}
        <Button inverse>Click</Button>
      </form>
    </>
  );
};

export default Form;
