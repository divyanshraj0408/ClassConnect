import "../../landingPage/pages/LandingPage.css";
import "../../classes/components/cards/cards.css";
import "./Form.css";
import Input from "../Input/Input";
import Button from "../button/Button";
import { VALIDATOR_REQUIRE } from "../util/Validator";

interface Props {
  handleClick: () => void;
  noOfInputs: Array<string>;
  name?: string;
}
const Form = (props: Props) => {
  return (
    <>
      <div className="modal-wrapper" onClick={props.handleClick}></div>
      <form className="card form">
        <h2 className="form__name">{props.name}</h2>
        {props.noOfInputs.map((input) => (
          <Input
            key={input}
            element="input"
            placeholder={input}
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
          />
        ))}
        <Button inverse>{props.name}</Button>
      </form>
    </>
  );
};

export default Form;
