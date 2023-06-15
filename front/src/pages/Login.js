import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useContext } from "react";
import { AuthContext } from "../assets/AuthContext";

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordError, setpasswordError] = useState("");
  // const [emailError, setmailError] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { userEmail: userEmail, password: password };
    axios.post("http://localhost:8000/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          useremail: response.data.useremail,
          id: response.data.id,
          status: true,
        });
      }
    });
  };

  return (
    // <div>
    //   <h1>로그인</h1>
    //   <p>서비스 이용을 위해 로그인해주세요</p>
    //   <div className="loginContainer">
    //     <label>UserEmail:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setUserEmail(event.target.value);
    //       }}
    //     />
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       onChange={(event) => {
    //         setPassword(event.target.value);
    //       }}
    //     />

    //     <button onClick={login}> Login </button>
    //   </div>
    // </div>
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <form id="loginform" onSubmit={login}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setUserEmail(event.target.value)}
              />
              {/* <small id="emailHelp" className="text-danger form-text">
                {emailError}
              </small> */}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {/* <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small> */}
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        {/* 
        Source: <a href="https://askavy.com/react-form/">React Form</a>
       */}
      </div>
    </div>
  );
};

export default LoginForm;
