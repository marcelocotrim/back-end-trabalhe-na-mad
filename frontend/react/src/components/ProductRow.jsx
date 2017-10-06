import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function ProductRow(props) {
  const { product } = props;
  return (
    <tr>
      <td>
        {product.name}
      </td>
      <td>
        {product.manufactureDate && moment(product.manufactureDate).format('DD/MM/YYYY')}
      </td>
      <td>
        {product.size}
      </td>
      <td>
        {product.width}
      </td>
      <td>
        {product.weight}
      </td>
      <td>
        {product.categories && product.categories.toString()}
      </td>
    </tr>
  );
}

ProductRow.propTypes = {
  product: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      manufactureDate: PropTypes.shape({ iso: PropTypes.string.isRequired }),
      size: PropTypes.number,
      width: PropTypes.number,
      weight: PropTypes.number,
      categories: PropTypes.arrayOf(PropTypes.string.isRequired),
    }).isRequired,
};

export default ProductRow;
