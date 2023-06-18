import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/authContext";

import { Button } from "react-bootstrap";
import "./style.css"; // CSS 파일을 불러옵니다.

function Header() {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (confirmLogout) {
      logout();
    }
  };

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
            환영합니다! {currentUser.username} 님
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
            <Link to="/mypage">
              <Button variant="My page" id="buttons">
                My page
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
