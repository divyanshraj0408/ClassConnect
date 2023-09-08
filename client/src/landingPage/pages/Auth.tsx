import { useState } from "react";
import Input from "../../shared/Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validator";
import Button from "../../shared/button/Button";
import Card from "../../shared/card/Card";
import { useForm } from "../../shared/hooks/form-hook";

import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler] = useForm(
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

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
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
            <Input
              element="input"
              id="email"
              type="email"
              placeholder="email"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              placeholder="password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              onInput={inputHandler}
            />
            <Button disabled={!formState}>
              <span>Login</span>
            </Button>
            <Button inverse onClick={switchModeHandler}>
              <span>Switch to signup</span>
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
export default Auth;
