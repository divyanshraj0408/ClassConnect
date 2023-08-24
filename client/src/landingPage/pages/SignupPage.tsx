import { Link } from "react-router-dom";
import { useState } from "react";

import Button from "../../shared/button/Button";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form className="card">
        <h1>Signup Page</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
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
        <Button>Signup</Button>
        <p>
          Already registred? <Link to="/login">login</Link>
        </p>
      </form>
    </>
  );
};

export default SignupPage;
