import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import CarNew from './SideCart';

class BarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { searchText } = this.state;
    const { getProducts } = this.props;

    getProducts(searchText);
  }

  render() {
    const { searchText } = this.state;
    const { QuantityItemCard, increase, decrease, del, alertComponent } = this.props;

    return (
      <header className="barsearch">
        <p data-testid="home-initial-message" className="lead fs-6">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <form onSubmit={ this.handleSubmit } className="form-search">
          <input
            type="text"
            placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
            data-testid="query-input"
            name="searchText"
            className="form-control"
            value={ searchText }
            onChange={ this.handleChange }
          />
          <button
            data-testid="query-button"
            type="submit"
            className="btn btn-success m-2 btn-lg"
          >
            <BsSearch />
          </button>
        </form>
        <div>
          <p
            data-testid="shopping-cart-size"
            className="text-success fs-3"
          >
            {QuantityItemCard}
          </p>
          <CarNew
            increase={ increase }
            decrease={ decrease }
            del={ del }
            QuantityItemCard={ QuantityItemCard }
            alertComponent={ alertComponent }
          />
        </div>
      </header>
    );
  }
}

BarSearch.propTypes = {
  getProducts: PropTypes.func.isRequired,
  QuantityItemCard: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  alertComponent: PropTypes.bool.isRequired,
};

export default BarSearch;
