import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/Input/Input";
import Button from "../../shared/button/Button";
import Card from "../../shared/card/Card";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner";
import ErrorModal from "../../shared/Modals/ErrorModal";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validator";

import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined || null || String);

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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          name: { value: "", isValid: false },
          ...formState.inputs,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_SERVER_URL + "/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        navigate(`/${responseData.userId}/classes`);
        setIsLoading(false);
        auth.login(responseData.userId, responseData.token);
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/users/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login(responseData.userid, responseData.token);
        navigate(`/${responseData.userId}/classes`);
      } catch (err: any) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError("");
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <div className="Authpage container">
        <h2>Your passwords are end to end encrypted 🙈</h2>
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login required</h2>
          <form onSubmit={authSubmitHandler} className="auth-form">
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                placeholder="Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                label="Your Name"
                errorText="Please enter a name"
              />
            )}
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
              placeholder="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onInput={inputHandler}
              label="Password"
              errorText="Please enter a valid password, at least 6 characters."
            />
            <Button type="submit" disabled={!formState.isValid}>
              <span>{isLoginMode ? "Login" : "Signup"}</span>
            </Button>
            <Button type="button" inverse onClick={switchModeHandler}>
              <span>
                Switch to {isLoginMode ? "Signup Mode" : "Login Mode"}
              </span>
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
export default Auth;
