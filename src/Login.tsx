import React, { useState, useContext } from "react";
import { IdentityContext } from "./Identity";

const Login = () => {
  const { loginProvider } = useContext(IdentityContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loginProvider("google");
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>google</button>
    </div>
  );
};

export default Login;
