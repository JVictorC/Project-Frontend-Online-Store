import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AiOutlinePlus, AiOutlineMinus, AiOutlineHome, AiFillRocket,
} from 'react-icons/ai';
import { FaSadCry } from 'react-icons/fa';

import { GrClose } from 'react-icons/gr';
import Footer from './Footer';
import '../Style/Cart Style/Cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.totalCart = this.totalCart.bind(this);
  }

  componentDidMount() {
    this.totalCart();
  }

  totalCart() {
    const { card } = this.props;
    let total = 0;
    card.forEach((item) => {
      total += (item.price * item.quantity);
    });
    return total.toFixed(2);
  }

  hadlerClick(event, id) {
    const { del } = this.props;
    del(event);
    const cardLocal = JSON.parse(localStorage.getItem('card'));
    localStorage.setItem('card',
      JSON.stringify(cardLocal.filter(({ id: idLocal }) => idLocal !== id)));
  }

  render() {
    const { card, increase, decrease, sideBar, alertComponent } = this.props;
    return (
      <div className="cart">
        <header className="header-cart">
          {
            card.length === 0
              ? (
                <h1
                  className="display-6 text-success"
                  data-testid="shopping-cart-empty-message"
                >
                  Seu carrinho está vazio
                  <FaSadCry className="mx-3" />
                </h1>
              )
              : (
                <h1 className="display-6 text-success">
                  Seu carrinho
                  <AiFillRocket className="mx-3" />
                </h1>
              )
          }
          {
            sideBar
              ? false
              : (
                <Link
                  to="/"
                >
                  <span role="img" aria-label="home">
                    <AiOutlineHome className="fs-2 text-success m-2" />
                  </span>
                </Link>
              )
          }

        </header>
        <main>
          {
            card.map(({ title, price, thumbnail, id, quantity }) => (
              <div key={ id } className="item">
                <p
                  data-testid="shopping-cart-product-name"
                  className="fs-4 lead m-3"
                >
                  {title}

                </p>
                <img src={ thumbnail } alt={ title } className="img-thumbnail" />
                <p className="fs-3 lead m-3">
                  { `R$: ${price}` }
                </p>
                <div className="d-flex quantity">
                  <button
                    onClick={ decrease }
                    type="button"
                    data-testid="product-decrease-quantity"
                    className="btn btn-outline-warning px-4"
                    id={ id }
                  >
                    <AiOutlineMinus id={ id } />
                  </button>
                  <p
                    data-testid="shopping-cart-product-quantity"
                    className="lead fs-2 text-success"
                  >
                    {quantity}

                  </p>
                  {
                    alertComponent
                      ? (
                        <button
                          data-bs-target="#exampleModal"
                          data-bs-toggle="modal"
                          onClick={ increase }
                          type="button"
                          data-testid="product-increase-quantity"
                          className="btn btn-outline-info px-4"
                          id={ id }
                        >
                          <AiOutlinePlus id={ id } />
                        </button>
                      )
                      : (
                        <button
                          onClick={ increase }
                          type="button"
                          data-testid="product-increase-quantity"
                          className="btn btn-outline-info px-4"
                          id={ id }
                        >
                          <AiOutlinePlus id={ id } />
                        </button>
                      )

                  }
                </div>
                <button
                  onClick={ (e) => this.hadlerClick(e, id) }
                  type="button"
                  id={ id }
                  className="btn btn-outline-danger button-large"
                >
                  <GrClose id={ id } />
                </button>
              </div>
            ))
          }
          <div className="total">
            <p className="lead fs-3">
              Valor total da compra:
              {` R$: ${this.totalCart()} `}
            </p>
            <Link
              data-testid="checkout-products"
              to="/checkout"
              className="btn btn-success button-large"
            >
              Finalizar Compra

            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  card: PropTypes.arrayOf(String).isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  sideBar: PropTypes.bool.isRequired,
  alertComponent: PropTypes.bool.isRequired,
};
