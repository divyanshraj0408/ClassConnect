import React, { useReducer, useEffect, ChangeEvent } from "react";

import { validate } from "../util/Validator";
import "./Input.css";

interface InputProps {
  id: string;
  initialValue?: string;
  initialValid?: boolean;
  element: "input" | "textarea";
  type?: string;
  placeholder?: string;
  rows?: number;
  label: string;
  validators: any[];
  onInput: Function;
  errorText: string;
}

interface InputState {
  value: string;
  isTouched: boolean;
  isValid: boolean;
}

const inputReducer = (
  state: InputState,
  action: {
    type: string;
    val?: string;
    validators?: ((value: string) => boolean)[];
  }
) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val || "",
        isValid: validate(action.val || "", action.validators || []),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
