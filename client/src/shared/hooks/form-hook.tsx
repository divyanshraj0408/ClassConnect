import { useCallback, useReducer } from "react";

// Define the types for your state
type FormState = {
  inputs: { [key: string]: { value: string; isValid: boolean } };
  isValid: boolean;
};

// Define the action types
type FormAction =
  | {
      type: "INPUT_CHANGE";
      value: string;
      isValid: boolean;
      inputId: string;
    }
  | {
      type: "SET_DATA";
      inputs: { [key: string]: { value: string; isValid: boolean } };
      formIsValid: boolean;
    };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (state.inputs[inputId] === undefined) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: { [key: string]: { value: string; isValid: boolean } },
  initialFormValidity: boolean
): [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (
    inputData: { [key: string]: { value: string; isValid: boolean } },
    formValidity: boolean
  ) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (
      inputData: { [key: string]: { value: string; isValid: boolean } },
      formValidity: boolean
    ) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
