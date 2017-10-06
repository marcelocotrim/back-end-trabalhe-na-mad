import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { showProductModal, hideFilter } from './../actions';

function NavigationBar(props) {
  return (
    <Navbar light>
      <Container>
        <NavbarBrand style={{ marginLeft: 15 }} href={'/'}>Teste 2</NavbarBrand>
        <Nav className="float-right">
          <Button
            id="productModalButton"
            color="primary"
            style={{ marginRight: 15 }}
            onClick={(e) => {
              e.preventDefault();
              props.showProductModal();
              props.hideFilter();
            }}
          >
            Novo Produto
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

NavigationBar.propTypes = {
  showProductModal: PropTypes.func.isRequired,
  hideFilter: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    showProductModal: () => {
      dispatch(showProductModal());
    },
    hideFilter: () => {
      dispatch(hideFilter());
    },
  };
}
export default connect(null, mapDispatchToProps)(NavigationBar);
