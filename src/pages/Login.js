import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "reactstrap";

function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_URL = "http://sefdb02.qut.edu.au:3000";
  const navigate = useNavigate(); // add this line to get the history object

  function login() {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.bearerToken.token);
        console.log(res);
        setSuccess("Login successful!");
        setError("");
        setTimeout(() => {
          navigate(-1)
        }, 1500)
        
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password");
        setSuccess("");
      });
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-header">Login</h1>

        {error != null ? <p className="login-error">{error}</p> : null}

        {success != null ? (
          <p className="login-success">{success}</p>
        ) : null}

        <div className="email-description">Enter your email address!</div>
        <Input
          aria-label="email-description"
          placeholder="Email"
          name="email"
          id="email"
          type="text"
          value={emailValue}
          onChange={(event) => {
            setEmailValue(event.target.value);
          }}
        />

        <div className="password-description">Enter your password!</div>
        <Input
          aria-label="password-description"
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          value={passwordValue}
          onChange={(event) => {
            setPasswordValue(event.target.value);
          }}
        />
        <Button className="login-button" type="button" onClick={login}>
          Submit
        </Button>

        <p>
          Not a member?{" "}
          <a className="register-link" href="/register">
            Click here to register!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
