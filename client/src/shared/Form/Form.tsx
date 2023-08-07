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
        <Input type="text" placeholder="ClassName" />
        <Input type="text" placeholder="Section" />
        <Input type="text" placeholder="class code" />
        <Input type="submit" value="Create Class" />
      </form>
    </>
  );
};

export default Form;
