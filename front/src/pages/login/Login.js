import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // try {
    //     const response = await axios.post("백엔드 api 엔드", {
    //       username,
    //       password,
    //     });

    //     // 로그인 성공 시 처리 로직
    //     console.log(response.data); // 응답 데이터를 확인하고 필요한 동작을 수행합니다.
    //   } catch (error) {
    //     // 로그인 실패 시 처리 로직
    //     console.error(error); // 오류 처리 또는 메시지를 표시합니다.
    //   }
    // };
  };

  return (
    <>
      <h1>로그인</h1>
      <p>서비스 이용을 위해 로그인해주세요</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디 입력"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
