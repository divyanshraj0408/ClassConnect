import { useState, useContext, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Modal from "../../../shared/Modals/Modal";
import Button from "../../../shared/button/Button";
import Input from "../../../shared/Input/Input";
import ErrorModal from "../../../shared/Modals/ErrorModal";

import { useForm } from "../../../shared/hooks/form-hook";
import { CreateClassContext } from "../../../shared/context/createClass-context";
import { AuthContext } from "../../../shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/Validator";

interface CreateClassModalProps {
  onClear: () => void;
  visible: boolean;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({ onClear, visible }) => {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
  const [error, setError]               = useState<string | null>(null);

  const auth        = useContext(AuthContext);
  const CreateClass = useContext(CreateClassContext);
  const navigate    = useNavigate();
  const userId      = useParams<{ uid: string }>().uid;

  const [formState, inputHandler] = useForm(
    {
      classname:   { value: "", isValid: false },
      description: { value: "", isValid: false },
      subject:     { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = (): void => setIsCreateMode((prev) => !prev);
  const errorHandler      = (): void => setError(null);

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const base = import.meta.env.VITE_REACT_APP_SERVER_URL as string;

    try {
      if (isCreateMode) {
        const response = await fetch(`${base}/classes`, {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            title:       formState.inputs.classname.value,
            description: formState.inputs.description.value,
            creator:     userId,
            classCode:   formState.inputs.subject.value,
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        CreateClass.create();
        navigate(`/${data.createClass.id}/assignments`);
      } else {
        const response = await fetch(`${base}/classes/join`, {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            classCode: formState.inputs.classcode?.value,
            userId,
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        CreateClass.create();
        navigate(`/${data.class._id}/assignments`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      <form onSubmit={onSubmitHandler}>
        <Modal
          header={isCreateMode ? "Create a class" : "Join a class"}
          show={visible}
          footer={
            <Button type="button" onClick={onClear}>
              Close
            </Button>
          }
        >
          {/* ── Create mode fields ── */}
          {isCreateMode && (
            <>
              <Input
                element="input"
                label="Class name"
                id="classname"
                placeholder="e.g. Advanced Mathematics"
                onInput={inputHandler}
                errorText="Please enter a class name."
                validators={[VALIDATOR_REQUIRE()]}
              />
              <Input
                element="textarea"
                label="Description"
                id="description"
                placeholder="What is this class about?"
                onInput={inputHandler}
                errorText="Description must be at least 10 characters."
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
              />
              <Input
                element="input"
                label="Subject / class code"
                id="subject"
                placeholder="e.g. MATH-101"
                onInput={inputHandler}
                errorText="Please enter a subject or code."
                validators={[VALIDATOR_REQUIRE()]}
              />
            </>
          )}

          {/* ── Join mode field ── */}
          {!isCreateMode && (
            <Input
              element="input"
              label="Class code"
              id="classcode"
              placeholder="Ask your teacher for the code"
              onInput={inputHandler}
              errorText="Please enter the class code."
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}

          <Button
            type="submit"
            disabled={isCreateMode ? !formState.isValid : false}
          >
            {isCreateMode ? "Create class" : "Join class"}
          </Button>

          <Button type="button" onClick={switchModeHandler} inverse>
            Switch to {isCreateMode ? "Join a class" : "Create a class"}
          </Button>
        </Modal>
      </form>
    </>
  );
};

export default CreateClassModal;