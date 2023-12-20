import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/Modals/Modal";
import Button from "../../../shared/button/Button";
import Input from "../../../shared/Input/Input";

import { useForm } from "../../../shared/hooks/form-hook";
import { CreateClassContext } from "../../../shared/context/createClass-context";
import { AuthContext } from "../../../shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/Validator";

interface props {
  onClear: any;
  visible: boolean;
}

const AssignmentModal = (props: props) => {
  const CreateClass = useContext(CreateClassContext);
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const cid = useParams().cid;

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/assignments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            classId: cid,
            creator: auth.userId,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      props.onClear();
      CreateClass.create(responseData.createdClass.className);
      console.log(responseData.createdClass.className);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Modal
          header="Create an Assignment"
          show={!!props.onClear}
          onCancel={() => {
            props.onClear;
          }}
          footer={<Button onClick={props.onClear}>close</Button>}
        >
          {
            <Input
              element="input"
              label="Title"
              id="title"
              onInput={inputHandler}
              errorText="enter a title for assignment"
              validators={[VALIDATOR_REQUIRE()]}
            ></Input>
          }
          {
            <Input
              element="textarea"
              label="description"
              id="description"
              onInput={inputHandler}
              errorText="enter a description"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
            ></Input>
          }

          <Button type="submit">Create Assignment</Button>
        </Modal>
      </form>
    </>
  );
};
export default AssignmentModal;
