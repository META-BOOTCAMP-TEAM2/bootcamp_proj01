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
      alert("성공적으로 로그아웃하였습니다.");
      navigate("/");
    }
  };

  return (
    <div className="line">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            {" "}
            <p className="logo"> 🏠 Your Sweet Home</p>
          </Link>
        </div>
        <div className="menu">
          <Link to="/">
            <Button className="menu-item" variant="Home" id="buttons">
              Home
            </Button>{" "}
          </Link>
          {currentUser ? (
            <>
              <Link to="/mypage">
                <Button className="menu-item" variant="My page" id="buttons">
                  My page
                </Button>
              </Link>
              <span className="menu-item" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="menu-item" variant="Login" id="buttons">
                  Login
                </Button>{" "}
              </Link>
              <Link to="/signup">
                <Button className="menu-item" variant="Sign up" id="buttons">
                  Sign up
                </Button>{" "}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
