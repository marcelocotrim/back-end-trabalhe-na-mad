import React from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col xs="auto">
            <h5>Contato</h5>
            <Nav vertical>
              <NavItem>
                <NavLink href="mailto:marcelocotrim@gmail.com">marcelocotrim@gmail.com</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="whatsapp://send?phone=+5521994053508">(21) 99405-3508</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://marcelocotrim.com" target="_blank" rel="noopener noreferrer">https://marcelocotrim.com</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
