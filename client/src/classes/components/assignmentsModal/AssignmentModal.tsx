import { useContext, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

interface AssignmentModalProps {
  onClear: () => void;
  visible: boolean;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ onClear, visible }) => {
  const auth        = useContext(AuthContext);
  const CreateClass = useContext(CreateClassContext);
  const navigate    = useNavigate();
  const cid         = useParams<{ cid: string }>().cid;

  const [formState, inputHandler] = useForm(
    {
      title:       { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/assignments/`,
        {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            title:       formState.inputs.title.value,
            description: formState.inputs.description.value,
            classId:     cid,
            creator:     auth.userId,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      CreateClass.create();
      onClear();
      navigate(-1);
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Modal
        header="Create an Assignment"
        show={visible}
        onCancel={onClear}
        footer={
          <Button type="button" onClick={onClear}>
            Close
          </Button>
        }
      >
        <Input
          element="input"
          label="Assignment title"
          id="title"
          placeholder="e.g. Problem Set 3"
          onInput={inputHandler}
          errorText="Please enter a title."
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          element="textarea"
          label="Description"
          id="description"
          placeholder="Describe the assignment…"
          onInput={inputHandler}
          errorText="Description must be at least 10 characters."
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Create assignment
        </Button>
      </Modal>
    </form>
  );
};

export default AssignmentModal;