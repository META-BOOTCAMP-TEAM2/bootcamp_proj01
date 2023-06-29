import React from "react";
import styled from "styled-components";

// 스타일을 적용한 컴포넌트 정의
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const NotFoundText = styled.p`
  font-size: 24px;
  color: gray;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404 - Not Found</NotFoundTitle>
      <NotFoundText>The page you are looking for does not exist.</NotFoundText>
    </NotFoundContainer>
  );
}

export default NotFound;
