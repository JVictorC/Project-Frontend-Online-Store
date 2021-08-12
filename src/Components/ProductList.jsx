import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.hadlerClick = this.hadlerClick.bind(this);
  }

  hadlerClick(product) {
    const { addToCard } = this.props;
    const { title, price, thumbnail, id } = product;
    const cardLocal = JSON.parse(localStorage.getItem('card'));
    addToCard(product);
    localStorage.setItem('card',
      JSON.stringify([...cardLocal, { title, price, thumbnail, id }]));
  }

  render() {
    const { products, getDetailsProduct } = this.props;
    return (
      <div className="product-container">
        <ul className="product-list">
          {products.map((product) => (
            <li data-testid="product" key={ product.id } className="product">
              <p className="lead">{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              {product.shipping.free_shipping
                ? (
                  <div data-testid="free-shipping">
                    <span role="img" aria-label="shipping">
                      📦 Frete Grátis
                    </span>
                  </div>
                )
                : false}
              <Link
                data-testid="product-detail-link"
                to={ `/ProductDetails/${product.id}` }
                onClick={ () => getDetailsProduct(product) }
                className="btn btn-outline-primary"
              >
                Ver detalhes
              </Link>
              <p className="lead">{`R$: ${product.price}`}</p>
              <button
                type="button"
                onClick={ () => this.hadlerClick(product) }
                data-testid="product-add-to-cart"
                className="btn btn-outline-success"
              >
                Adicionar no Carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addToCard: PropTypes.func.isRequired,
  getDetailsProduct: PropTypes.func.isRequired,
};
