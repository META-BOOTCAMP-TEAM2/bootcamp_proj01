import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((response) => {
      console.log(response.data.rows);
      setUsers(response.data.rows);
    });
  }, []);
  return (
    <div className="App">
      {users.map((value, key) => {
        return (
          <div className="user">
            <h1>User Lists {value.id}</h1>
            <div className="title"> {value.name} </div>
            <div className="body">{value.userid}</div>
            <div className="footer">{value.password}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
