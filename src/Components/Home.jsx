import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getProductsFromCategoryAndQuery } from '../services/api';

import BarSearch from './BarSearch';
import Category from './Category';
import ProductList from './ProductList';
import Footer from './Footer';
import Loading from './Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    const { card } = this.props;
    this.state = {
      products: [],
      categorySelect: undefined,
      card,
      loading: false,
    };
    this.getProducts = this.getProducts.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addToCard = this.addToCard.bind(this);
  }

  handleClick({ target }) {
    this.setState({ loading: true }, async () => {
      const response = await getProductsFromCategoryAndQuery(
        target.id,
        null,
        true,
      );

      const { results } = await response;

      this.setState({
        categorySelect: target.id,
        products: results,
        loading: false,
      });
    });
  }

  async getProducts(searchText) {
    const { categorySelect } = this.state;
    const items = await getProductsFromCategoryAndQuery(
      categorySelect,
      searchText,
    ).then((result) => result.results);
    this.setState({ products: items });
  }

  async addToCard(item) {
    const { title, price, thumbnail, id, availableQtd } = item;
    const { getCardItem } = this.props;
    const { card } = this.state;
    const checkExist = card.find((product) => product.id === id);
    if (!checkExist) {
      const newItem = { title, price, thumbnail, id, availableQtd };
      newItem.quantity = 1;
      this.setState((prevState) => ({ card: [...prevState.card, newItem] }), () => {
        getCardItem();
      });
    } else if (availableQtd > checkExist.quantity) {
      getCardItem();
    } else {
      getCardItem();
    }
  }

  render() {
    const { products, card, loading } = this.state;

    const { QuantityItemCard, increase, decrease, del, alertComponent } = this.props;
    return (
      <div className="grid-container">
        <BarSearch
          getProducts={ this.getProducts }
          QuantityItemCard={ QuantityItemCard }
          increase={ increase }
          decrease={ decrease }
          del={ del }
          alertComponent={ alertComponent }
        />
        <main className="Product-Show">
          <Category handleClick={ this.handleClick } />
          {
            loading
              ? <Loading />
              : (
                <ProductList
                  products={ products }
                  addToCard={ this.addToCard }
                  card={ card }
                />
              )
          }
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  getCardItem: PropTypes.func.isRequired,
  QuantityItemCard: PropTypes.number.isRequired,
  card: PropTypes.arrayOf(PropTypes.object).isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  alertComponent: PropTypes.bool.isRequired,
};
