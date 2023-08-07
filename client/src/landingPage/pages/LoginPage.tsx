import { Link } from "react-router-dom";
import { useState } from "react";

import "./LoginPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form className="card">
        <h1>Login Page</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Link to="/classes">
          <input type="submit" value="Login" />
        </Link>
        <p>
          Already registred? <Link to="/signup">signup</Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
