import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// component & css
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";

const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    name: "", // 이름
    userid: "", // 아이디 [고유값]
    password: "", // 비밀번호
    email: "", // 이메일 [고유값]
    phone: "", // 연락처
  });
  const [err, setError] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDuplicateCheck = async (e) => {
    e.preventDefault();
    try {
      const id = inputs.userid;
      const response = await axios.get(`/users/${id}`);
      if (response.data === null) {
        setIsUsernameValid(true);
        alert("가입 가능한 회원입니다.");
      } else {
        setIsUsernameValid(false);
        alert("중복된 사용자 이름입니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일 정규표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 연락처 정규표현식 (숫자 11개)
    const contactRegex = /^\d{3}-\d{4}-\d{4}$/;

    const { email, phone } = inputs;

    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 주소를 입력해주세요. 예: [example@example.com]");
      return;
    }

    // 연락처 유효성 검사
    if (!contactRegex.test(phone)) {
      alert("올바른 연락처를 입력해주세요. 예: [010-1111-1111]");
      return;
    }

    try {
      await axios.post("/auth/join", inputs);
      alert("회원가입에 성공했습니다.");
      navigate("/login");
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
              className="signbox"
              required
              type="text"
              placeholder="이름 (예: 유비씨)"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="signbox"
              required
              type="text"
              placeholder="아이디 (예: team)"
              name="userid"
              onChange={handleChange}
            />
            <button onClick={handleDuplicateCheck}>중복확인</button>
            {isUsernameValid === true && <p>가입 가능한 회원입니다.</p>}
            {isUsernameValid === false && <p>중복된 사용자 이름입니다.</p>}
          </div>
          <div>
            <input
              className="signbox"
              required
              type="password"
              placeholder="비밀번호"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="signbox"
              required
              type="email"
              placeholder="이메일 (예: test@test.com)"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="signbox"
              required
              type="text"
              placeholder="연락처 (예: 010-1111-1111)"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="submitButton"
              onClick={handleSubmit}
              disabled={!isUsernameValid}
            >
              가입하기
            </button>
          </div>
          {err && <p>{err}</p>}
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
