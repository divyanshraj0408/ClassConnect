import Form from "../../../shared/Form/Form";

import "./Menu.css";

interface JoinClassProps {
  handleClick: () => void;
}

const JoinClass = (props: JoinClassProps) => {
  return (
    <div>
      <div className="menu-wrapper" onClick={props.handleClick}></div>
      <Form
        name="Join Class"
        noOfInputs={["classCode"]}
        handleClick={props.handleClick}
      />
    </div>
  );
};
export default JoinClass;
