import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormGroup, FormFeedback, Label, Input, Row } from 'reactstrap';
import { fetchCategories, changeProductField, resetProductForm, saveProduct, fetchProducts, hideFilter } from './../actions';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }
  componentWillMount() {
    this.props.fetchCategories();
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
    this.props.saveProduct(objectId, name, manufactureDate, size, width, weight, categories);
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
    console.log(this.props)
    return (
      <Form style={{ marginBottom: 40 }}>
        <FormGroup color={submit === true && !name ? 'danger' : null}>
          <Label for="name">Nome</Label>
          <Input id="name" name="name" type="text" value={name} state={submit === true && !name ? 'danger' : null} onChange={this.onChange} />
          {submit === true &&
            <FormFeedback hidden={name}>{'Esse campo é obrigatório'}</FormFeedback>
          }
        </FormGroup>
        <Row>
          <Col>
            <FormGroup color={submit === true && !manufactureDate ? 'danger' : null}>
              <Label for="manufactureDate">Data de Fabricação</Label>
              <Input id="manufactureDate" type="date" value={manufactureDate} state={submit === true && !manufactureDate ? 'danger' : null} onChange={this.onChange} />
              {submit === true &&
                <FormFeedback hidden={manufactureDate}>{'Esse campo é obrigatório'}</FormFeedback>
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
            id="categories"
            type="select"
            multiple
            onClick={() => {
              this.props.changeProductField({
                prop: 'categories',
                value: $('#categories').val(),
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
  fetchCategories: PropTypes.func.isRequired,
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
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
    changeProductField: (field) => {
      dispatch(changeProductField(field));
    },
    resetProductForm: () => {
      dispatch(resetProductForm());
    },
    saveProduct: (objectId, name, manufactureDate, size, width, weight, categories) => {
      dispatch(saveProduct(objectId, name, manufactureDate, size, width, weight, categories));
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
