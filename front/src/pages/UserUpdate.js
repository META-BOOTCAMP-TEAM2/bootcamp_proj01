import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/authContext";

// component & css
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";

const UserUpdatePage = () => {
  const { logout } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: `${localStorage.getItem("username")}`, // 이름
    userid: `${localStorage.getItem("userid")}`, // 아이디 [고유값]
    email: `${localStorage.getItem("email")}`, // 이메일 [고유값]
    phone: `${localStorage.getItem("phone")}`, // 연락처
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
      const userId = inputs.userid;
      const response = await axios.get(`/users/search/${userId}`);
      if (response.data === null) {
        setIsUsernameValid(true);
        alert("변경 가능한 아이디.");
      } else {
        setIsUsernameValid(false);
        alert("중복된 아이디 입니다.");
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
      await axios.put(`/users/${localStorage.getItem("id")}`, inputs);
      alert("수정에 성공했습니다.");
      logout();
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="sign">
        <div className="signBackColor">
          <div className="signTitle">
            <h2>회원수정</h2>
          </div>
          <form>
            <div>
              <input
                className="signBox"
                required
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="signBox"
                required
                type="text"
                name="userid"
                value={inputs.userid}
                onChange={handleChange}
              />
              <button className="idCheckButton" onClick={handleDuplicateCheck}>
                중복확인
              </button>
              {isUsernameValid === true && <p className="signBoxText1">가입 가능한 회원입니다.</p>}
              {isUsernameValid === false && (
                <p className="signBoxText2">중복된 사용자 이름입니다.</p>
              )}
            </div>
            <div>
              <input
                className="signBox"
                required
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="signBox"
                required
                type="text"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
              />
            </div>
            <div className="signContent">
              <div>
                <button
                  className="signSubmitButton"
                  onClick={handleSubmit}
                  disabled={!isUsernameValid}
                >
                  수정하기
                </button>
              </div>
              {err && <p>{err}</p>}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserUpdatePage;
