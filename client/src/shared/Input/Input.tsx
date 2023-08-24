import { useReducer } from "react";

import { validate } from "../util/validator";
import "./Input.css";
interface InputProps {
  placeholder?: string;
  type: string;
  value?: string;
  element?: string;
  id?: string;
  rows?: number;
  validators?: any[];
}

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }

    default:
      return state;
  }
};
const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });
  const changeHandler = (event) => {
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
      {/* <label htmlFor={props.id}>{props.placeholder}</label> */}
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p>{props.placeholder} is not valid ⚠️</p>
      )}
    </div>
  );
};
export default Input;
