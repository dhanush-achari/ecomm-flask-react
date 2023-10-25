import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const AuthForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AuthFormContainer = () => {
  const [authType, setAuthType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (authType === "login") {
      var jsonData = {
        username: name,
        password: password,
      };
      console.log(authType);
      console.log(jsonData);
      axios
        .post("http://127.0.0.1:5000/login", jsonData)
        .then(function (response) {
          console.log(response.data.user_id);
          Cookies.set('user_id', response.data.user_id, { expires: 7 });
          navigate("/verifyOtp");
          //Perform action based on response
        })
        .catch(function (error) {
          console.log(error);
          //Perform action based on error
        });
    } 
  else{
      var jsonData = {
        username: name,
        email: email,
        password: password,
      };
      console.log(jsonData);
      console.log(authType);
      axios
        .post("http://127.0.0.1:5000/register", jsonData)
        .then(function (response) {
          console.log(response);
          //Perform action based on response
        })
        .catch(function (error) {
          console.log(error);
          //Perform action based on error
        });
    }
  };

  const handleAuthTypeChange = (event) => {
    setAuthType(event.target.value);
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <h1>{authType === "login" ? "Login" : "Sign Up"}</h1>
      <p>Please enter your credentials:</p>

      <Input
        type="text"
        name="name"
        placeholder="User Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      {authType === "signup" && (
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      )}
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button type="submit" value="Submit" onClick={handleSubmit}>
        {authType === "login" ? "Login" : "Sign Up"}
      </Button>
      {/* <Button type="submit" value="Submit" onClick={handleSubmit}>
        {authType === "signup" ? "Sign Up" : "Login"}
      </Button> */}

      <a href="#">Forgot your password?</a>

      <select value={authType} onChange={handleAuthTypeChange}>
        <option value="login">Login</option>
        <option value="signup">Sign Up</option>
      </select>
    </AuthForm>
  );
};

export default AuthFormContainer;
