import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("userid") || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    // console.log(res.data);
    // console.log(typeof res.data);
    const { userid, name, role } = res.data;
    const token = res.headers["token"]; // 헤더에서 토큰 추출

    // 로그인 응답에서 받은 userid, name, role을 localStorage에 JSON 형식으로 저장
    localStorage.setItem("userid", JSON.stringify(userid)); //유저아이디
    localStorage.setItem("name", JSON.stringify(name)); //닉네임
    localStorage.setItem("role", JSON.stringify(role)); //유저 등급
    localStorage.setItem("token", token); // 토큰 저장

    setCurrentUser(res.data.userid);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");

    // 로그아웃 시 localStorage에서 해당 데이터 제거
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token"); // 토큰 제거
    setCurrentUser(null);
  };

  // useEffect(() => {
  //   localStorage.setItem("userid", JSON.stringify(currentUser?.userid));
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
