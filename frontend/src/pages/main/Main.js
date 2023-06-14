import React from "react";
import Header from "../../components/Header/Header";
import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
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
          <button className="upload" id="Button">
            방 내놓기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
