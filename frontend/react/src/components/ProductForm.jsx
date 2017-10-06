import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { changeProductField, resetProductForm, saveProduct, fetchProducts, hideFilter } from './../actions';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }
  componentWillUnmount() {
    this.props.resetProductForm();
  }
  onChange(e) {
    this.props.changeProductField({ prop: e.target.id, value: e.target.value });
  }
  onClickSave(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    const { objectId, name, manufactureDate, size, width, weight, categories } = this.props;
    this.props.saveProduct({ objectId, name, manufactureDate, size, width, weight, categories });
  }
  onClickSearch(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    const { name, manufactureDate, size, width, weight, categories } = this.props;
    this.props.fetchProducts({ name, manufactureDate, size, width, weight, categories });
    this.props.hideFilter();
  }
  render() {
    const {
      allCategories,
      name,
      manufactureDate,
      size,
      width,
      weight,
      submit,
      isLoading,
      save,
    } = this.props;
    return (
      <Form style={{ marginBottom: 40 }}>
        <FormGroup color={submit === true && !name ? 'danger' : null}>
          <Label for="name">Nome</Label>
          <Input id="name" name="name" type="text" value={name} onChange={this.onChange} />
          {submit === true &&
            <div hidden={name} className="form-control-feedback">{'Esse campo é obrigatório'}</div>
          }
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label for="manufactureDate">Data de Fabricação</Label>
              <Input id="manufactureDate" type="date" value={manufactureDate} onChange={this.onChange} />
              {submit === true &&
                <div hidden={manufactureDate} className="form-control-feedback">{'Esse campo é obrigatório'}</div>
              }
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="size">Tamanho</Label>
              <Input id="size" type="number" value={size} onChange={this.onChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="width">Largura</Label>
              <Input id="width" type="number" value={width} onChange={this.onChange} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="weight">Peso</Label>
              <Input id="weight" type="number" value={weight} onChange={this.onChange} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="categories">Categorias</Label>
          <Input
            id={save ? 'saveCategories' : 'categories'}
            name="categories"
            type="select"
            multiple
            onClick={() => {
              this.props.changeProductField({
                prop: 'categories',
                value: $(save ? '#saveCategories' : '#categories').val(),
              });
            }}
          >
            {
              allCategories.map(category => (
                <option key={category.objectId}>{category.name}</option>
              ))
            }
          </Input>
        </FormGroup>
        <Button
          id="button"
          color="primary"
          className="float-right"
          disabled={isLoading}
          onClick={save === true ? this.onClickSave : this.onClickSearch}
        >
          {save === true ? 'Salvar' : 'Pesquisar'}
        </Button>
      </Form>
    );
  }
}

ProductForm.propTypes = {
  changeProductField: PropTypes.func.isRequired,
  resetProductForm: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  hideFilter: PropTypes.func.isRequired,
  allCategories: PropTypes.arrayOf(
    PropTypes.shape(
      {
        objectId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      },
    ),
  ).isRequired,
  objectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  manufactureDate: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  submit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  save: PropTypes.bool.isRequired,
};

function mapStateToProps({ productReducer }) {
  return productReducer;
}
function mapDispatchToProps(dispatch) {
  return {
    changeProductField: (field) => {
      dispatch(changeProductField(field));
    },
    resetProductForm: () => {
      dispatch(resetProductForm());
    },
    saveProduct: (params) => {
      dispatch(saveProduct(params));
    },
    fetchProducts: (filters) => {
      dispatch(fetchProducts(filters));
    },
    hideFilter: () => {
      dispatch(hideFilter());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));
