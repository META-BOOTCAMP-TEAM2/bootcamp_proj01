import React from "react";
import exampleUser from "../assets/examUser.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";
import { Link } from "react-router-dom";

const MyPage = () => {
  // 현재 로그인한 사용자의 userID (예: 1)
  const currentUserId = "1";

  // 현재 로그인한 사용자의 정보를 찾는 함수
  const getCurrentUser = () => {
    return exampleUser.find((user) => user.userID === currentUserId);
  };

  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = getCurrentUser();

  return (
    <div className="MyPage">
      <Header />
      <div className="Title">
        <h2>My Page</h2>
      </div>
      <div className="content">
        <h3>나의 정보</h3>
        <p> 이름 : {currentUser.name}</p>
        <p> 아이디 : {currentUser.id}</p>
        <p> 이메일 주소 : {currentUser.email}</p>
        <p> 연락처 : {currentUser.phoneNumber}</p>
      </div>
      <Link to="/myLists">
        <button className="myUpLoad">내가 올린 매물</button>
      </Link>
      <Footer />
    </div>
  );
};

export default MyPage;
