import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>404</h1>
          <h5>OOPS! ESSA PÁGINA NÃO FOI ENCONTRADA</h5>
          <hr />
          Parece que nada foi encontrado nessa localização.
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
