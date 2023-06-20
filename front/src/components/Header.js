import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/authContext";

import { Button } from "react-bootstrap";
import "./style.css"; // CSS 파일을 불러옵니다.
import axios from "axios";

function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    // 새로고침 시 로그인 상태를 복원
    const getCookie = localStorage.getItem("token");
    if (!!getCookie === true) {
      // token이 빈 값이 아니라면
      // setIsLoggedIn(true);
      axios.defaults.headers.common.Authorization = `Bearer ${getCookie}`;
    }
  }, []);

  return (
    <div className="Header">
      <div className="header1">
        <Link to="/">
          {" "}
          <p className="Logo"> 🏠 Your Sweet Home</p>
        </Link>
      </div>
      <div className="header2">
        {currentUser && (
          <div style={{ fontSize: "20px", color: "orange" }}>
            <h1>환영합니다! {currentUser} 님</h1>
          </div>
        )}
        <Link to="/">
          <Button variant="Home" id="buttons">
            Home
          </Button>{" "}
        </Link>

        {currentUser ? (
          <>
            <Link to="/mypage">
              <Button variant="My page" id="buttons">
                My page
              </Button>
            </Link>
            <span onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="Login" id="buttons">
                Login
              </Button>{" "}
            </Link>
            <Link to="/signup">
              <Button variant="Sign up" id="buttons">
                Sign up
              </Button>{" "}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
