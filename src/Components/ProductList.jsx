import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.hadlerClick = this.hadlerClick.bind(this);
  }

  getDetailsProduct(product) {
    const {
      thumbnail, price, title, shipping, id, available_quantity: availableQtd,
    } = product;
    const { free_shipping: freeshipping } = shipping;
    localStorage.setItem('productDetail',
      JSON.stringify({ thumbnail, price, title, freeshipping, id, availableQtd }));
  }

  hadlerClick(product) {
    const { addToCard } = this.props;
    const { title, price, thumbnail, id, available_quantity: availableQtd } = product;
    const cardLocal = JSON.parse(localStorage.getItem('card'));
    if (cardLocal.some((objc) => objc.id === product.id)) {
      const newLocalCard = cardLocal.map((obj) => {
        if (obj.id === product.id) {
          obj.quantity += 1;
        }
        return obj;
      });
      addToCard(newLocalCard);
      localStorage.setItem('card',
        JSON.stringify(newLocalCard));
    } else {
      addToCard({ ...product, quantity: 1 });
      localStorage.setItem('card',
        JSON.stringify(
          [...cardLocal,
            { title, price, thumbnail, id, quantity: 1, availableQtd },
          ],
        ));
    }
  }

  render() {
    const { products } = this.props;
    return (
      <div className="product-container">
        <ul className="product-list">
          {products.map((product) => (
            <li data-testid="product" key={ product.id } className="product">
              <p className="lead">{product.title}</p>
              <img
                src={ product.thumbnail }
                alt={ product.title }
                className="img-thumbnail my-2"
              />
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
                onClick={ () => this.getDetailsProduct(product) }
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
};
