import Modal from "../../../shared/Modals/Modal";
import Button from "../../../shared/button/Button";
import Input from "../../../shared/Input/Input";
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
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    if (isCreateMode) {
      console.log("create");
      try {
        const response = await fetch("http://localhost:5000/api/classes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formState.inputs.classname.value,
            description: formState.inputs.discription.value,
            creator: "652ed3ff50a800e1403f79f2",
            classCode: formState.inputs.subject.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        CreateClass.create();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Modal
          header="Join a class"
          show={props.visible}
          onCancel={() => {
            !!props.onClear;
          }}
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
              label="discription"
              id="discription"
              onInput={inputHandler}
              errorText="enter a disciption"
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
          <Button type="submit">Create Class</Button>
          <Button onClick={switchModeHandler}>Switch to join class</Button>
        </Modal>
      </form>
    </>
  );
};
export default CreateClassModal;
