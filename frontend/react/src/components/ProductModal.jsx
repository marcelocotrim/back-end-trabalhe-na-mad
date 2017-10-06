import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactLoading from 'react-loading';
import { hideProductModal } from './../actions';
import ProductForm from './ProductForm';

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    this.props.hideProductModal();
  }
  render() {
    const { isShowing, error, success, isLoading } = this.props;
    return (
      <Modal
        className="modal-lg"
        isOpen={isShowing}
        toggle={this.onClose}
      >
        <ModalHeader
          toggle={this.onClose}
        >
          Novo Produto
        </ModalHeader>
        <ModalBody>
          {isLoading === true &&
            <ReactLoading className="spin" delay={0} type={'spin'} color={'#ccc'} height={24} width={24} />
          }
          {success && success === true &&
            <Alert color="success">
              {'O produto foi salvo com sucesso.'}
            </Alert>
          }
          {error &&
            <Alert color="danger">
              {`Oops! ${error.message}`}
            </Alert>
          }
          <ProductForm save />
        </ModalBody>
      </Modal>
    );
  }
}

ProductModal.propTypes = {
  hideProductModal: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps({ productReducer }) {
  return productReducer;
}
function mapDispatchToProps(dispatch) {
  return {
    hideProductModal: () => {
      dispatch(hideProductModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
