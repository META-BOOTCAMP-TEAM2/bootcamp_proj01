import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((response) => {
      console.log(response.data.rows);
      setUsers(response.data.rows);
    });
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>

    // <div className="App">
    //   {users.map((value, key) => {
    //     return (
    //       <div className="user">
    //         <h1>User Lists {value.id}</h1>
    //         <div className=""> {value.name} </div>
    //         <div className="">{value.userid}</div>
    //         <div className="">{value.password}</div>
    //         <div className="">{value.email}</div>
    //         <div className="">{value.phone}</div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}

export default App;
