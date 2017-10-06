import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Button, Collapse, Container, Table } from 'reactstrap';
import ReactLoading from 'react-loading';
import ProductRow from './ProductRow';
import ProductModal from './ProductModal';
import ProductForm from './ProductForm';
import { fetchProducts, showFilter, hideFilter } from './../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  componentWillMount() {
    this.props.fetchProducts({});
  }
  toggle() {
    const { isOpen } = this.props;
    if (isOpen === true) {
      this.props.hideFilter();
    } else {
      this.props.showFilter();
    }
  }
  render() {
    const { isOpen, products, isLoading, error } = this.props;
    return (
      <Container>
        {isLoading === true &&
          <ReactLoading className="spin" delay={0} type={'spin'} color={'#ccc'} height={24} width={24} />
        }
        {error &&
          <Alert color="danger">
            {`Oops! ${error.message}`}
          </Alert>
        }
        <Button
          id="filterButton"
          outline
          color="primary"
          style={{ marginBottom: 15 }}
          onClick={this.toggle}
        >
          Filtro
        </Button>
        <Collapse isOpen={isOpen}>
          <ProductForm save={false} />
        </Collapse>
        <h5>Produtos</h5>
        {products.length > 0 && isLoading === false &&
          <Table striped style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th className="expand">
                  <Button
                    color="link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.fetchProducts({ ascending: 'nameNoDiacritics' });
                    }}
                  >
                    Nome
                  </Button>
                </th>
                <th className="expand">
                  <Button
                    color="link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.fetchProducts({ ascending: 'manufactureDate' });
                    }}
                  >
                    Data de Fabicação
                  </Button>
                </th>
                <th className="expand">
                  <Button
                    color="link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.fetchProducts({ ascending: 'size' });
                    }}
                  >
                    Tamanho
                  </Button>
                </th>
                <th className="expand">
                  <Button
                    color="link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.fetchProducts({ ascending: 'width' });
                    }}
                  >
                    Largura
                  </Button>
                </th>
                <th className="expand">
                  <Button
                    color="link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.fetchProducts({ ascending: 'weight' });
                    }}
                  >
                    Peso
                  </Button>
                </th>
                <th className="expand">
                  <Button
                    color="link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.fetchProducts({ ascending: 'categories' });
                    }}
                  >
                    Categoria(s)
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                products.map(product => (
                  <ProductRow
                    key={product.objectId}
                    product={product}
                  />
                ))
              }
            </tbody>
          </Table>
        }
        {products.length === 0 && isLoading === false &&
          'Nenhum produto encontrado.'
        }
        <ProductModal />
      </Container>
    );
  }
}

Home.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  showFilter: PropTypes.func.isRequired,
  hideFilter: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
};

function mapStateToProps({ productsReducer }) {
  return productsReducer;
}
function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: (filters) => {
      dispatch(fetchProducts(filters));
    },
    showFilter: () => {
      dispatch(showFilter());
    },
    hideFilter: () => {
      dispatch(hideFilter());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
