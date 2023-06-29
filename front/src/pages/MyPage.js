import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/authContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/mypage/${currentUser}`);
        console.log(res.data);
      } catch (err) {
        alert(err.response.data);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };
    fetchData();
  }, []);

  const btnClick1 = async () => {
    try {
      const res = await axios.get(`/post/${currentUser}`);
      const result = res.data;
      const newUrl = "/myLists";
      const newWindow = window.open(newUrl);
      newWindow.sessionStorage.setItem("myData", JSON.stringify(result));
      console.log(result);
    } catch (err) {
      alert(err);
    }
  };

  const btnClick2 = async () => {
    try {
      const res = await axios.get(`/post/${currentUser}`);
      const result = res.data;
      const newUrl = "/likePage";
      const newWindow = window.open(newUrl);
      newWindow.sessionStorage.setItem("myData", JSON.stringify(result));
      console.log(result);
    } catch (err) {
      alert(err.response.data);
    }
  };
  return (
    <div>
      <Header />
      <div className="myPage">
        <div className="myPageImg"></div>
        <div className="myPageContent">
          <div className="myPageTitle">
            <h2>My Page</h2>
          </div>

          <div className="myPageBox">
            <h3 className="myPageSubTitle">나의 정보</h3>
            <div className="myPageInfo">
              <p> 이름 : {localStorage.getItem("username")}</p>
              <p> 아이디 : {localStorage.getItem("userid")}</p>
              <p> 이메일 주소 : {localStorage.getItem("email")}</p>
              <p> 연락처 : {localStorage.getItem("phone")}</p>
            </div>
          </div>

          <div>
            <button className="myUpLoad" onClick={() => btnClick1()}>
              내가 올린 매물
            </button>
            <div>
              <button className="myUpLoad" onClick={() => btnClick2()}>
                내가 찜한 매물
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;

// 페이지를 새로고침할 때 currentUser 값이 사라지는 이유는 currentUser 값을 로컬 스토리지(localStorage)에 저장했기 때문입니다. 로컬 스토리지는 브라우저의 세션에 종속되는 저장소이며, 페이지를 새로고침하면 로컬 스토리지에 저장된 값이 초기화됩니다.

// currentUser 값을 페이지 새로고침에도 유지하기 위해서는 다음과 같은 방법 중 하나를 선택할 수 있습니다:

// 쿠키를 사용하여 currentUser 값을 저장하기: 서버에서 응답할 때 쿠키를 설정하여 currentUser 값을 저장하고, 페이지가 로드될 때 쿠키를 읽어서 값을 복원합니다. 이렇게 하면 쿠키에 저장된 값은 페이지 새로고침에도 유지됩니다.

// React Context를 사용하여 currentUser 값을 관리하기: AuthContext와 같은 React Context를 사용하여 currentUser 값을 전역적으로 관리합니다. Context를 사용하면 여러 컴포넌트에서 currentUser 값을 공유하고 사용할 수 있으며, 페이지 새로고침에도 값이 유지됩니다.
