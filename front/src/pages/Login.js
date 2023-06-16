import React, { useState } from "react";
// import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    // 구글 소셜 로그인 처리
  };

  const handleKakaoLogin = () => {
    // 카카오 소셜 로그인 처리
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // try {
    //     const response = await axios.post("http://192.168.0.30:8000/auth/login", {
    //       username,
    //       password,
    //     });

    //     // 로그인 성공 시 처리 로직
    //     console.log(response.data); // 응답 데이터를 확인하고 필요한 동작을 수행합니다.
    //   } catch (error) {
    //     // 로그인 실패 시 처리 로직
    //     console.error(error); // 오류 처리 또는 메시지를 표시합니다.
    //   }
    // };
  };

  return (
    <>
      <Header />
      <div className="Login">
        <h2>로그인</h2>
        <div>서비스 이용을 위해 로그인해주세요</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input-group"
            type="text"
            placeholder="아이디 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            className="input-group"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Link to="/signup" style={{ fontSize: 20 }}>
            회원가입
          </Link>
          <br />
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="buttonGoogle"
          >
            Login With Google
          </button>
          <br />
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="buttonKakao"
          >
            Login With Kakao
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
