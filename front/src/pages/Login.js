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

<<<<<<< HEAD
  const handleGoogleLogin = () => {
    // 구글 소셜 로그인 처리
=======
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
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
  };

  const handleKakaoLogin = async (e) => {
    // 카카오 소셜 로그인 처리
    e.preventDefault();
    try {
      await axios.get("auth/kakao/logout").then((req, res) => {
        alert(Object.keys(res));
      });
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="login">
        <div className="loginBackColor">
          <div className="loginTitle">
            <h2>로그인</h2>
            <div>서비스 이용을 위해 로그인해주세요</div>
          </div>
          <form className="loginContent" onSubmit={handleSubmit}>
            <div>
              <input
                className="loginBox"
                required
                type="text"
                placeholder="아이디 입력"
                name="userid"
                // onChange={(e) => setUsername(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="loginBox"
                required
                type="password"
                placeholder="비밀번호 입력"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button className="loginSubmitButton" onClick={handleSubmit}>
              로그인
            </button>
            <button type="button" onClick={handleGoogleLogin} className="loginButtonGoogle">
              Login With Google
            </button>
            <button type="button" onClick={handleKakaoLogin} className="loginButtonKakao">
              Login With Kakao
            </button>
            {err && <p>{err}</p>}

<<<<<<< HEAD
            <div className="loginInSignText">
              계정이 있으신가요?{" "}
              <Link className="loginInSign" to="/signup">
                회원가입
              </Link>
            </div>
          </form>
        </div>
=======
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
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
