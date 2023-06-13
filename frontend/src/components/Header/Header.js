import React from "react";
import { Button } from "react-bootstrap";
import "./Header.css"; // CSS 파일을 불러옵니다.

function Header() {
  return (
    <div className="header0">
      <div className="header1">
        <p className="Logo"> 🏠 Your Sweet Home</p>
      </div>
      <div className="header2">
        <Button variant="Home" id="buttons">
          Home
        </Button>{" "}
        <Button variant="Login" id="buttons">
          Login
        </Button>{" "}
        <Button variant="Sign up" id="buttons">
          Sign up
        </Button>{" "}
        <Button variant="My page" id="buttons">
          My page
        </Button>
      </div>
    </div>
  );
}

export default Header;
