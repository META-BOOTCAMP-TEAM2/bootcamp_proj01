import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const login = async (inputs) => {
    // const API = "http://192.168.0.30:8000";
    const res = await axios.post("auth/login", inputs);
    const { userid, username, role, id, email, phone } = res.data;

    // 로그인 응답에서 받은 userid, username, role을 localStorage에 JSON 형식으로 저장
    localStorage.setItem("id", id); //유저DB아이디
    localStorage.setItem("userid", userid); //유저아이디
    localStorage.setItem("username", username); //닉네임
    localStorage.setItem("role", role); //유저 등급
    localStorage.setItem("email", email); //유저 이메일
    localStorage.setItem("phone", phone); //유저 연락처
    setCurrentUser(true);
  };

  const logout = async () => {
    // 로그아웃 시 localStorage에서 해당 데이터 제거
    axios
      .post("/auth/logout")
      .then(() => {
        localStorage.removeItem("id");
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        setCurrentUser(null);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
