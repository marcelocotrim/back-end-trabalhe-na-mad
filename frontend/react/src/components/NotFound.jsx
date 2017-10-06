import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

class NotFound extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>404</h1>
            <h5>OOPS! ESSA PÁGINA NÃO FOI ENCONTRADA</h5>
            <hr/>
            Parece que nada foi encontrado nessa localização.
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect()(NotFound)
