import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/authContext";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";
import axios from "axios";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    userid: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    // 구글 소셜 로그인 처리
    try {
      const response = await axios.get("http://localhost:8000/auth/google");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  // const handleKakaoLogin = () => {
  //   // 카카오 소셜 로그인 처리
  // };

  return (
    <>
      <Header />
      <div className="Login">
        <h2>로그인</h2>
        <div>서비스 이용을 위해 로그인해주세요</div>
        <form onSubmit={handleSubmit}>
          <input
            required
            className="input-group"
            type="text"
            placeholder="아이디 입력"
            name="userid"
            // onChange={(e) => setUsername(e.target.value)}
            onChange={handleChange}
          />
          <br />
          <input
            className="input-group"
            type="password"
            placeholder="비밀번호 입력"
            name="password"
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSubmit}>로그인</button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="buttonGoogle"
          >
            Login With Google
          </button>
          <br />
          {/* <button
            type="button"
            onClick={handleKakaoLogin}
            className="buttonKakao"
          >
            Login With Kakao
          </button> */}
          <br />
          {err && <p>{err}</p>}
        </form>
        <p className="linkSign">
          계정이 있으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
