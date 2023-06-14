import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navbar from "../Navbar/Navbar";

function Header() {
  return (
    <div className="header0">
      <div className="header1">
        <Link to="/" className="logo">
          🏠 Your Sweet Home
        </Link>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
