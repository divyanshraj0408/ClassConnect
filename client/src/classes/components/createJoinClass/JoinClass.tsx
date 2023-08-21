import Form from "../../../shared/Form/Form";

import "./Menu.css";

interface JoinClassProps {
  handleClick: () => void;
}

const joinClass = (props: JoinClassProps) => {
  return (
    <div>
      <div className="menu-wrapper" onClick={props.handleClick}></div>
      <Form noOfInputs={["classCode"]} handleClick={props.handleClick} />
    </div>
  );
};
export default joinClass;
