import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Location from "./pages/location/Location";
import Upload from "./pages/Upload";
import MyPage from "./pages/MyPage";
import Listing from "./pages/Listing";
import MyListing from "./pages/MyListing";
import ListingDetail from "./pages/ListingDetail";
import "../src/assets/example.json";

// API 서버 url : http://localhost:8000
// API 서버 url : http://localhost:8000
function App() {
  return (
    //usestate로 로그인 여부 체크하면서 mypage view 판단하는건??
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room" element={<Location />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/lists" element={<Listing />} />
          <Route path="/myLists" element={<MyListing />} />
          <Route path="/listDetail/:saleItem" element={<ListingDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
