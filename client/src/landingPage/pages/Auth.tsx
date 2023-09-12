import { useState } from "react";
import Input from "../../shared/Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validator";
import Button from "../../shared/button/Button";
import Card from "../../shared/card/Card";
import { useForm } from "../../shared/hooks/form-hook";

import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // const switchModeHandler = () => {
  //   if (!isLoginMode) {
  //     setFormData(
  //       {
  //         ...formState.inputs,
  //         name: undefined,
  //       },
  //       formState.inputs.email.isValid && formState.inputs.password.isValid
  //     );
  //   } else {
  //     setFormData(
  //       {
  //         ...formState.inputs,
  //         name: {
  //           value: "",
  //           isValid: false,
  //         },
  //       },
  //       false
  //     );
  //   }
  //   setIsLoginMode((prevMode) => !prevMode);
  // };
  const authSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <>
      <div className="Authpage container">
        <Card>
          <h2>Login required</h2>
          <form onSubmit={authSubmitHandler}>
            {/* {!isLoginMode && (
              <Input
                element="input"
                id="Name"
                type="text"
                placeholder="Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            )} */}
            <Input
              element="input"
              id="email"
              type="email"
              placeholder="Email"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              label="Email"
              errorText="Please enter a valid email address"
            />

            <Input
              element="input"
              id="password"
              type="password"
              placeholder="password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onInput={inputHandler}
              label="password"
              errorText="Please enter a valid password address"
            />

            <Button type="submit" disabled={!formState.isValid}>
              {/* {console.log(!formState.isValid)} */}
              <span>{isLoginMode ? "Login" : "Signup"}</span>
            </Button>
            {/* <Button inverse onClick={switchModeHandler}>
              <span>
                Switch to {isLoginMode ? "Signup Mode" : "Login Mode"}
              </span>
            </Button> */}
          </form>
        </Card>
      </div>
    </>
  );
};
export default Auth;
