import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Cart from './Cart';

class CarNew extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.hadlerClick = this.hadlerClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.uptadeState(prevProps);
  }

  uptadeState(prevProps) {
    const { QuantityItemCard } = this.props;
    const cartLocal = JSON.parse(localStorage.getItem('card'));
    if (prevProps.QuantityItemCard !== QuantityItemCard) {
      this.setState({ cart: cartLocal });
    }
  }

  hadlerClick() {
    const cartLocal = JSON.parse(localStorage.getItem('card'));
    this.setState({ cart: cartLocal });
  }

  render() {
    const { increase, decrease, del, alertComponent } = this.props;
    console.log(this.props);
    const { cart } = this.state;
    return (
      <div data-testid="shopping-cart-button">
        <button
          className="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          onClick={ this.hadlerClick }
        >
          <AiOutlineShoppingCart className="fs-1 text-success" />
        </button>

        <div
          className="offcanvas offcanvas-end w-50"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div
            className="offcanvas-header"
          >
            <h5 id="offcanvasRightLabel">Cart</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <Cart
              card={ cart }
              increase={ increase }
              decrease={ decrease }
              del={ del }
              sideBar
              alertComponent={ alertComponent }
            />
          </div>
        </div>
      </div>
    );
  }
}

CarNew.propTypes = {
  QuantityItemCard: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  alertComponent: PropTypes.bool.isRequired,
};

export default CarNew;
