import { useReducer, useEffect } from "react";

import { validate } from "../util/Validator";
import "./Input.css";
interface InputProps {
  placeholder?: string;
  type: string;
  value?: string;
  element?: string;
  id?: string;
  rows?: number;
  validators?: any[];
  changeHandler?: (id: string, value: string, isValid: boolean) => void;
  onInput?: (id: string, value: string, isValid: boolean) => void;
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

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

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
