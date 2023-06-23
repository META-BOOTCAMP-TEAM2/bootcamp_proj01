import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleRoomUpload = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      navigate("/upload"); // 업로드 페이지로 이동
    }
  };

  return (
    <div className="total">
      <Header />
      <div className="home">
        <div className="homeImg">
          <p className="homeImgText">
            <p className="homeImgText1">A Perfect Start for Your Future</p>
            <br />
            Find your home
          </p>
        </div>
        <div className="homeButtons">
          <Link to="/room">
            <button id="Button1">
              {" "}
              <p className="circle1">●&nbsp;</p> Buy
            </button>
          </Link>
          <p className="homeLine">아래 라인 공간</p>
          <button id="Button2" onClick={handleRoomUpload}>
            <p className="circle2">●&nbsp;</p> Sell
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
