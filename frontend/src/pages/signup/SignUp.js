<<<<<<< HEAD
=======
// import React, { useState } from "react";

// const SignUpPage = () => {
//   const [name, setName] = useState("");
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordCheck, setPasswordCheck] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };
//   const handleIdChange = (e) => {
//     setId(e.target.value);
//   };
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };
//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 회원가입 요청 로직 구현
//     // 예: axios 또는 fetch를 사용하여 서버에 회원가입 요청 보내기

//     // console.log("Email:", email);
//     // console.log("Password:", password);
//   };

//   return (
//     <div>
//       <h2>회원가입</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">이름:</label>
//           <input type="text" id="name" value={name} onChange={handleNameChange} required />
//         </div>
//         <div>
//           <label htmlFor="email">이메일:</label>
//           <input type="email" id="email" value={email} onChange={handleEmailChange} required />
//         </div>
//         <div>
//           <label htmlFor="password">비밀번호:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="passwordCheck">비밀번호 확인:</label>
//           <input
//             type="password"
//             id="passwordCheck"
//             value={passwordCheck}
//             onChange={handlePasswordCheckChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="id">아이디:</label>
//           <input type="text" id="id" value={id} onChange={handleIdChange} required />
//         </div>
//         <div>
//           <label htmlFor="phoneNumber">연락처:</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             value={phoneNumber}
//             onChange={handlePhoneNumberChange}
//             required
//           />
//         </div>
//         <button type="submit">가입하기</button>
//       </form>
//     </div>
//   );
// };

// export default SignUpPage;

>>>>>>> front
import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
<<<<<<< HEAD
      const response = await axios.post("http", {
=======
      const response = await axios.post("/signUp", {
>>>>>>> front
        name,
        id,
        password,
        email,
        phoneNumber,
      });
<<<<<<< HEAD
      console.log(response);
=======
>>>>>>> front

      console.log("회원가입 성공:", response.data);
      // 회원가입 성공 처리 및 페이지 이동 등 추가 작업 수행
    } catch (error) {
      console.error("회원가입 실패:", error.response.data);
<<<<<<< HEAD

      // 회원가입 실패 처리
=======
      // 회원가입 실패 처리 및 에러 메시지 표시 등 추가 작업 수행
>>>>>>> front
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름</label>
          <br />
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="id">아이디:</label>
          <br />
          <input type="text" id="id" value={id} onChange={handleIdChange} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordCheck">비밀번호 확인:</label>
          <br />
          <input
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <br />
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">연락처:</label>
          <br />
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignUpPage;
