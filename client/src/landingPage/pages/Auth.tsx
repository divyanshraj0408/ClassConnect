import { useContext, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/Input/Input";
import Button from "../../shared/button/Button";
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

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [isLoading, setIsLoading]     = useState<boolean>(false);
  const [error, setError]             = useState<string | null>(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email:    { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  // ── mode switch ─────────────────────────────────────────────────────────────
  const switchModeHandler = (): void => {
    if (!isLoginMode) {
      // switching back to login — drop the name field
      setFormData(
        {
          email:    formState.inputs.email,
          password: formState.inputs.password,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // switching to signup — add name field
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  // ── submit ──────────────────────────────────────────────────────────────────
  const authSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    const base = import.meta.env.VITE_REACT_APP_SERVER_URL as string;

    try {
      const url  = isLoginMode ? `${base}/users/login` : `${base}/users/signup`;
      const body = isLoginMode
        ? {
            email:    formState.inputs.email.value,
            password: formState.inputs.password.value,
          }
        : {
            name:     formState.inputs.name?.value,
            email:    formState.inputs.email.value,
            password: formState.inputs.password.value,
          };

      const response     = await fetch(url, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      auth.login(responseData.userId, responseData.token);
      navigate(`/${responseData.userId}/classes`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong, please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (): void => setError(null);

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      <div className="auth-page">
        {/* left panel — decorative */}
        <div className="auth-panel auth-panel--left" aria-hidden="true">
          <div className="auth-panel__glow auth-panel__glow--1" />
          <div className="auth-panel__glow auth-panel__glow--2" />
          <div className="auth-panel__content">
            <p className="auth-panel__logo">ClassConnect</p>
            <h2 className="auth-panel__tagline">
              Your virtual classroom,<br />
              <em>beautifully organised.</em>
            </h2>
            <ul className="auth-panel__list">
              {[
                "📋  Manage assignments & grades",
                "💬  Interact with students in real-time",
                "🔒  End-to-end encrypted passwords",
                "📊  Track class progress at a glance",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* right panel — form */}
        <div className="auth-panel auth-panel--right">
          {isLoading && <LoadingSpinner asOverlay />}

          <div className="auth-form-wrapper">
            {/* header */}
            <div className="auth-form-header">
              <div className="auth-form-header__icon">
                {isLoginMode ? "👋" : "🚀"}
              </div>
              <h1 className="auth-form-header__title">
                {isLoginMode ? "Welcome back" : "Create account"}
              </h1>
              <p className="auth-form-header__sub">
                {isLoginMode
                  ? "Sign in to access your classes."
                  : "Join ClassConnect for free today."}
              </p>
            </div>

            {/* form */}
            <form onSubmit={authSubmitHandler} className="auth-form" noValidate>
              {!isLoginMode && (
                <div className="auth-form__field">
                  <Input
                    element="input"
                    id="name"
                    type="text"
                    placeholder="Full name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    label="Full name"
                    errorText="Please enter your name."
                  />
                </div>
              )}

              <div className="auth-form__field">
                <Input
                  element="input"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  validators={[VALIDATOR_EMAIL()]}
                  onInput={inputHandler}
                  label="Email address"
                  errorText="Please enter a valid email address."
                />
              </div>

              <div className="auth-form__field">
                <Input
                  element="input"
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  onInput={inputHandler}
                  label="Password"
                  errorText="Password must be at least 6 characters."
                />
              </div>

              <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? "Sign in →" : "Create account →"}
              </Button>
            </form>

            {/* switch mode */}
            <div className="auth-switch">
              <span>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</span>
              <button
                type="button"
                className="auth-switch__btn"
                onClick={switchModeHandler}
              >
                {isLoginMode ? "Sign up" : "Sign in"}
              </button>
            </div>

            <p className="auth-encrypt-note">🙈 Your passwords are end-to-end encrypted.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;