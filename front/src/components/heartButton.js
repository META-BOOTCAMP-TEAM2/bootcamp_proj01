import React, { useState, useEffect } from "react";
import HeartImg from "../assets/컬러하트.png";
import EmptyHeartImg from "../assets/흑백하트.png";

const HeartButton = ({ like, onClick }) => {
  return (
    <img
      className="heart"
      src={like ? HeartImg : EmptyHeartImg}
      onClick={onClick}
      width={100}
      height={100}
    />
  );
};

export default HeartButton;
