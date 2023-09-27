import { useState } from "react";

import Form from "../../../shared/Form/Form";
import Link from "../../../shared/button/LinkElement";
import JoinClass from "./JoinClass";
import Input from "../../../shared/Input/Input";
import "./Menu.css";
import { VALIDATOR_REQUIRE } from "../../../shared/util/Validator";
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
        <>
          <div className="modal-wrapper" onClick={props.handleClick}></div>
          <div className="create-class-form">
            <Input
              id="classname"
              element="input"
              label="classname"
              validators={[VALIDATOR_REQUIRE]}
              onInput={() => {}}
              errorText="ENTER A VALID NAME FOR THE CLASS"
            />
            <Input
              id="description"
              element="textarea"
              label="description"
              validators={[VALIDATOR_REQUIRE]}
              onInput={() => {}}
              errorText="ENTER A VALID DESCRIPTION FOR THE CLASS"
            />
          </div>
        </>
      )}
      {showJoinModal && <JoinClass handleClick={props.handleClick} />}
    </>
  );
};

export default CreateClass;
