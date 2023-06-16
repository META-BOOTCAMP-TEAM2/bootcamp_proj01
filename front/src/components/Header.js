import React from "react";
import { Button } from "react-bootstrap";
import "./style.css"; // CSS 파일을 불러옵니다.
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <div className="header1">
        <p className="Logo"> 🏠 Your Sweet Home</p>
      </div>
      <div className="header2">
        <Link to="/">
          <Button variant="Home" id="buttons">
            Home
          </Button>{" "}
        </Link>
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
        <Link to="mypage">
          <Button variant="My page" id="buttons">
            My page
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
