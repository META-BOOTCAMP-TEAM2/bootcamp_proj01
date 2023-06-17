import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//component & css
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";

//유저 모델 수정 필요함
const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    // userInital: "",
    username: "",
    password: "",
    email: "",
    // phoneNumber: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  //handleChange : 입력 필드의 값이 변경될 때마다 해당 입력 필드의 이름에 해당하는 inputs 상태를 업데이트
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login"); //바로 로그인할수있도록 로그인 페이지로 리다이렉트함.
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="Sign">
        <h2>회원가입</h2>
        <br></br>
        <form>
          <div>
            <input
              required
              type="text"
              placeholder="이름"
              name="userInital"
              // onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="text"
              placeholder="아이디"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              placeholder="비밀번호"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="email"
              placeholder="이메일"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="text"
              placeholder="연락처"
              name="phoneNumber"
              // onChange={handleChange}
            />
          </div>
          <div>
            <button className="submitButton" onClick={handleSubmit}>
              가입하기
            </button>
          </div>
          {err && <p>{JSON.stringify(err)}</p>}
          <div>
            계정이 있으신가요? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
