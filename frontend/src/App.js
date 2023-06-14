import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
import Home from "./pages/main/Main";
import LoginForm from "./pages/login/Login";
import SignUpPage from "./pages/signup/SignUp";
import LocationPage from "./pages/location/Location";

function App() {
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   axios.get("http://localhost:8000/users").then((response) => {
  //     console.log(response.data.rows);
  //     setUsers(response.data.rows);
  //   });
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/room" element={<LocationPage />} />
        </Routes>
      </BrowserRouter>

      {/* <div className="App">
        {users.map((value, key) => {
          return (
            <div className="user">
              <h1>User Lists {value.id}</h1>
              <div className=""> {value.name} </div>
              <div className="">{value.userid}</div>
              <div className="">{value.password}</div>
              <div className="">{value.email}</div>
              <div className="">{value.phone}</div>
            </div>
          );
        })}
      </div> */}
    </>
  );
}

export default App;
