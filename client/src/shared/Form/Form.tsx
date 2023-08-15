import "../../landingPage/pages/LandingPage.css";
import "../../classes/components/cards/cards.css";
import "./Form.css";
import Input from "../Input/Input";

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
        <Input type="submit" value="Create Class" element="input" />
      </form>
    </>
  );
};

export default Form;
