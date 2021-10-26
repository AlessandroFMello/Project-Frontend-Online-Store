import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class DetailProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: '',
      attributes: [],
    };

    this.fetchAndSaveProduct = this.fetchAndSaveProduct.bind(this);
  }

  componentDidMount() {
    this.fetchAndSaveProduct();
  }

  async fetchAndSaveProduct() {
    const {
      match: {
        params: { productId, categoryId, productName },
      },
    } = this.props;
    const products = await getProductsFromCategoryAndQuery(
      categoryId,
      productName,
    );

    const { title, price, thumbnail, attributes } = products.results
      .find((product) => product.id === productId);

    this.setState({ title, price, thumbnail, attributes });
  }

  render() {
    const { title, price, thumbnail, attributes } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        {attributes.map(({ name, value_name: valueName, id }) => (
          <div key={ id }>
            <h3>{`${name}: ${valueName}`}</h3>
          </div>
        ))}
      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.number,
      categoryId: PropTypes.number,
      productName: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailProduct;
