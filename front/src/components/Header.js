import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/authContext";
import "./style.css";

function Header() {
  const { logout } = useContext(AuthContext);
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
            <p className="logo"> 🏠 Your Sweet Home</p>
          </Link>
        </div>
        <div className="menu">
          {localStorage.getItem("userid") ? (
            <>
              <div className="welcome">
                {localStorage.getItem("userid")} 님, 환영합니다😊
              </div>
              <p className="menu-item" variant="link" id="buttons">
                <Link to="/mypage">My page</Link>
              </p>
              <a href="#" className="menu-item" onClick={handleLogout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <p className="menu-item" variant="link" id="buttons">
                <Link to="/">Home</Link>
              </p>
              <p className="menu-item" variant="link" id="buttons">
                <Link to="/login">Login</Link>
              </p>
              <p className="menu-item" variant="link" id="buttons">
                <Link to="/signup">Sign up</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
