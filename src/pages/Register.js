import React, { useState } from "react";
import { Input, Button } from "reactstrap";

function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_URL = "http://sefdb02.qut.edu.au:3000";

  function register() {
    const url = `${API_URL}/user/register`;

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
        if (res.error) {
          setError(res.message);
          setSuccess(null);
        } else {
          setSuccess("Registration successful. Login please!");
          setError(null);
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (passwordValue !== confirmPasswordValue) {
      setError("Passwords do not match");
      setSuccess(null);
      return;
    }

    register();
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-header">Register</h1>

        {error != null ? (
          <p className="register-error">{error}</p>
        ) : null}

        {success != null ? (
          <p className="register-success">{success}</p>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div id="email-description">Please enter a valid email address.</div>
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

          <div id="password-description">Please enter a valid password.</div>
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

          <div id="confirm-password-description">Please confirm your password.</div>
          <Input
            aria-label="confirm-password-description"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={confirmPasswordValue}
            onChange={(event) => {
              setConfirmPasswordValue(event.target.value);
            }}
          />

          <Button id="register-button" type="submit">
            Register
          </Button>
        </form>

        <p>
          Already a member?{" "}
          <a className="register-link" href="/login">
            Click here to Login!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
