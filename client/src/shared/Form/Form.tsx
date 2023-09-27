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
  inputHandler: any;
}
const Form = (props: Props) => {
  return (
    <>
      <div className="modal-wrapper" onClick={props.handleClick}></div>
      <form className="card form">
        <h2 className="form__name">{props.name}</h2>
        {props.noOfInputs.map((input: string) => (
          <Input
            label={input}
            element="input"
            id={input}
            type={input}
            placeholder={input}
            validators={[VALIDATOR_REQUIRE()]}
            onInput={props.inputHandler}
            errorText="Please enter a valid input"
          />
        ))}
        <Button inverse>{props.name}</Button>
      </form>
    </>
  );
};

export default Form;
