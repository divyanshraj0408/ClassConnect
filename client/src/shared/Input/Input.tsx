import { useReducer } from "react";

interface InputProps {
  placeholder?: string;
  type: string;
  value?: string;
  element?: string;
  id?: string;
  rows?: number;
}

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };

    default:
      return state;
  }
};
const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  return (
    <>
      {element}
      {inputState.isValid ? null : <p>{props.placeholder} is not valid</p>}
    </>
  );
};
export default Input;
