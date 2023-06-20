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
    <div className="home">
      <Header />
      <div className="back">
        <div className="sentence">
          당신의<br></br>새로운 시작을 위한 최적의 선택,<br></br> 여러분의
          행복을 위한<br></br>
          최적의 선택을 제공합니다.
        </div>
        <div className="buttons">
          <Link to="/room">
            <button className="choice" id="Button">
              방 구하기
            </button>
          </Link>
          <button className="upload" id="Button" onClick={handleRoomUpload}>
            방 내놓기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
