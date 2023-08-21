import { useState } from "react";

import Form from "../../../shared/Form/Form";
import Link from "../../../shared/button/LinkElement";
import JoinClass from "./JoinClass";
import "./Menu.css";
interface Props {
  handleClick: () => void;
}
const CreateClass = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const showCreateClassModal = () => {
    setShowModal(!showModal);
  };
  const showJoinClassModal = () => {
    setShowJoinModal(!showJoinModal);
  };
  return (
    <>
      <div className="menu-wrapper" onClick={props.handleClick}></div>
      <menu className="menu">
        <Link text="Join class" handleClick={showJoinClassModal} />
        <Link text="Create one" handleClick={showCreateClassModal} />
      </menu>
      {showModal && (
        <Form
          name="Create Class"
          noOfInputs={["className", "description"]}
          handleClick={showCreateClassModal}
        />
      )}
      {showJoinModal && <JoinClass handleClick={props.handleClick} />}
    </>
  );
};

export default CreateClass;
