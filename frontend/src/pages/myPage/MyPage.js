import React from "react";
import { ListGroup } from "react-bootstrap";

const MyPage = () => {
  return (
    <>
      <h2>My Page</h2>
      <button>개인 정보</button>
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default MyPage;
