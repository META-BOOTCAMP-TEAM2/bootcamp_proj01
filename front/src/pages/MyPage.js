import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/authContext";

//컴포넌트& css
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";

const MyPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="MyPage">
      <Header />
      <div className="Title">
        <h2>My Page</h2>
      </div>
      <div className="content">
        <h3>나의 정보</h3>
        {/* <p> 이름 : {currentUser.userInital}</p> */}
        <p> 아이디 : {currentUser.username}</p>
        <p> 이메일 주소 : {currentUser.email}</p>
        {/* <p> 연락처 : {currentUser.phoneNumber}</p> */}
      </div>
      <Link to="/myLists">
        <button className="myUpLoad">내가 올린 매물</button>
      </Link>
      <Footer />
    </div>
  );
};

export default MyPage;
