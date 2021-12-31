import { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import empty_cart from "../../assets/images/empty_cart.png";
import styles from "./Header.module.css";
import { fetchCategories, fetchCurrencies } from "../../api/products.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], currencies: [] };
  }

  componentDidMount() {
    fetchCategories().then((data) =>
      this.setState({ categories: data.data.categories })
    );
    fetchCurrencies().then((data) =>
      this.setState({ currencies: data.data.currencies })
    );
  }

  render() {
    return (
      <header>
        <div className={styles.container}>
          <nav>
            <ul className={styles.navigation}>
              {this.state.categories.map((category) => (
                <li key={category.name}>
                  <NavLink to={`/listing/${category.name}`}>
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/listing/all">
            <img src={logo} alt="logo" />
          </Link>
          <div className={styles.header_btns}>
            <div className={styles.currency_picker}>
              <select>
                {this.state.currencies.map((currency) => (
                  <option key={currency.label}>{currency.symbol}</option>
                ))}
              </select>
            </div>
            <Link to="/cart" className={styles.cart_modal}>
              <img src={empty_cart} alt="cart" />
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
