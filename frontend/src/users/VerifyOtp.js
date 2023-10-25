import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
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

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
      var otpJson = {
        user_id : Cookies.get("user_id"),
        otp: otp
      };
      console.log(otpJson);
      // axios
      //   .post("http://127.0.0.1:5000/otp_login", otpJson)
      //   .then(function (response) {
      //     console.log(response);
      //     //Perform action based on response
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     //Perform action based on error
      //   });
      fetch("http://127.0.0.1:5000/otp_login", {
        method: 'POST',
        body: JSON.stringify(otpJson),
        credentials: 'same-origin',   // this line has been added
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      })
    }
  return (
    <AuthForm onSubmit={handleSubmit}>
      <p>Please enter the OTP sent to your registered mail</p>
      <Input
        type="text"
        name="otp"
        placeholder="OTP"
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
      />
      <Button type="submit" value="Submit" >
        Submit
      </Button>
    </AuthForm>
  );
};

export default VerifyOtp;
