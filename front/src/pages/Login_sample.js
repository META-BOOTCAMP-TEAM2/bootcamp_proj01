// import axios from "axios";
// import React, { useState, useContext } from "react";
// import { AuthContext } from "../assets/AuthContext";
import Google from "../assets/google.png";
import Kakao from "../assets/KakaoTalk_logo.svg";
import "./stylePages.css";

import Footer from "../components/Footer";
import googleImg from "../../assets/google.jpg";
import kakaoImg from "../../assets/kakao.jpg";

const LoginForm = () => {
  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const Kakao = () => {
    window.open("http://localhost:8000/auth/kakao", "_self");
  };

  // const [userEmail, setUserEmail] = useState("");
  // const [password, setPassword] = useState("");
  // // const [passwordError, setpasswordError] = useState("");
  // // const [emailError, setmailError] = useState("");
  // const { setAuthState } = useContext(AuthContext);

  // const login = () => {
  //   const data = { userEmail: userEmail, password: password };
  //   axios.post("http://localhost:8000/auth/login", data).then((response) => {
  //     if (response.data.error) {
  //       alert(response.data.error);
  //     } else {
  //       localStorage.setItem("accessToken", response.data.token);
  //       setAuthState({
  //         useremail: response.data.useremail,
  //         id: response.data.id,
  //         status: true,
  //       });
  //     }
  //   });
  // };

  return (
    <>
      <Header />
      <div className="Login">
        <h2>로그인</h2>
        <div>서비스 이용을 위해 로그인해주세요</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
          <br />
          <button type="button" onClick={handleGoogleLogin}>
            <img src={googleImg} style={{ width: 100, height: 30 }} />
          </button>
          <br />
          <button type="button" onClick={handleKakaoLogin}>
            <img src={kakaoImg} style={{ width: 100, height: 30 }} />
          </button>
          <br />
          {/* <a href="" class="button button--google">
            Login With Google
          </a> */}
        </form>
      </div>
      <Footer />
    </>

    // //   <h1>로그인</h1>
    // //   <p>서비스 이용을 위해 로그인해주세요</p>

    // <div className="login">
    //   <h1 className="loginTitle">서비스 이용을 위해 로그인해주세요</h1>
    //   <div className="wrapper">
    //     <div className="left">
    //       <div className="loginButton google" onClick={google}>
    //         <img src={Google} alt="" className="icon" />
    //         Google
    //       </div>
    //       <div className="loginButton Kakao" onClick={Kakao}>
    //         <img src={Kakao} alt="" className="icon" />
    //         Kakao
    //       </div>
    //     </div>
    //     <div className="center">
    //       <div className="line" />
    //       <div className="or">OR</div>
    //     </div>
    //     <div className="right">
    //       <input type="text" placeholder="Username" />
    //       <input type="text" placeholder="Password" />
    //       <button className="submit">Login</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginForm;
