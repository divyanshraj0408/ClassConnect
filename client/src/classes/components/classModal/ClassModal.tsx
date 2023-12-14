import Modal from "../../../shared/Modals/Modal";
import Button from "../../../shared/button/Button";
import Input from "../../../shared/Input/Input";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { useForm } from "../../../shared/hooks/form-hook";
import { CreateClassContext } from "../../../shared/context/createClass-context";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/Validator";

interface props {
  onClear: any;
  visible: boolean;
}

const CreateClassModal = (props: props) => {
  const CreateClass = useContext(CreateClassContext);
  const [formState, inputHandler] = useForm(
    {
      className: {
        value: "",
        isValid: false,
      },
      discription: {
        value: "",
        isValid: false,
      },
      subject: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isCreateMode, setIsCreateMode] = useState(true);

  const switchModeHandler = () => {
    setIsCreateMode((prevMode: any) => !prevMode);
  };
  const userId = useParams().uid;
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    if (isCreateMode) {
      try {
        const response = await fetch("http://localhost:5000/api/classes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formState.inputs.classname.value,
            description: formState.inputs.description.value,
            creator: userId,
            classCode: formState.inputs.subject.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        props.onClear();
        CreateClass.create();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/classes/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classCode: formState.inputs.classcode.value,
            userId: userId,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.message);
        CreateClass.create();
      } catch (err) {
        console.log(err);
      }
    }
    fetch("http://localhost:5000/api/classes");
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Modal
          header={isCreateMode ? "Create a class" : "Join a class"}
          show={!!props.onClear}
          footer={<Button onClick={props.onClear}>close</Button>}
        >
          {isCreateMode && (
            <Input
              element="input"
              label="ClassName"
              id="classname"
              onInput={inputHandler}
              errorText="enter a classname"
              validators={[VALIDATOR_REQUIRE()]}
            ></Input>
          )}
          {isCreateMode && (
            <Input
              element="textarea"
              label="description"
              id="description"
              onInput={inputHandler}
              errorText="enter a description"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
            ></Input>
          )}
          {isCreateMode && (
            <Input
              element="input"
              label="Subject Name"
              id="subject"
              onInput={inputHandler}
              errorText="enter the subject"
              validators={[VALIDATOR_REQUIRE()]}
            ></Input>
          )}
          {!isCreateMode && (
            <Input
              element="input"
              label="Class Code"
              id="classcode"
              onInput={inputHandler}
              errorText="enter the class code"
              validators={[VALIDATOR_REQUIRE()]}
            ></Input>
          )}
          <Button type="submit">
            {isCreateMode ? "Create Class" : "Join Class"}
          </Button>
          <Button type="button" onClick={switchModeHandler} inverse>
            Switch to {isCreateMode ? "Join Class" : "Create Class"}
          </Button>
        </Modal>
      </form>
    </>
  );
};
export default CreateClassModal;
