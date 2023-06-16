import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyPage = () => {
  return (
    <div>
      <Header />
      <h2>My Page</h2>
      <h3>내 정보 : 이름, 이메일, 연락처</h3>
      <h3>내가 올린 매물 목록</h3>
      <h3>문의 사항</h3>
      <Footer />
    </div>
  );
};

export default MyPage;
