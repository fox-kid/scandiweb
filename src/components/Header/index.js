import { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import empty_cart from "../../assets/images/empty_cart.png";
import styles from "./Header.module.css";
import { fetchCategories, fetchCurrencies } from "../../api/products.js";
import Modal from "../Modal";
import Cart from "../../pages/Cart";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      showModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      total: 0,
    });
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
    const amount = this.props.cartProducts.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0
    );
    return (
      <header>
        <div className={styles.container}>
          <nav>
            <ul className={styles.navigation}>
              {this.state.categories.map((category) => (
                <li key={category.name}>
                  <NavLink
                    to={`/listing/${category.name}`}
                    activeClassName={styles.active}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/listing/all" className={styles.header_logo}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={styles.header_btns}>
            <div className={styles.currency_picker}>
              <select
                onChange={(e) => this.props.changeCurrency(e.target.value)}
                value={this.props.currency}
              >
                {this.state.currencies.map((currency) => (
                  <option key={currency.label}>{currency.symbol}</option>
                ))}
              </select>
            </div>
            <button
              className={styles.show_modal_btn}
              onClick={this.toggleModal}
            >
              <span className={styles.cart_quantity}>{amount}</span>
              <img src={empty_cart} alt="cart" />
            </button>
          </div>
          {this.state.showModal && (
            <Modal>
              <div className={styles.modal_cart}>
                <div className={styles.modal_header}>
                  My Bag,
                  <span className={styles.items_quantity}>{amount}items</span>
                </div>
                <div className={styles.modal_cart_content}>
                  <Cart
                    cartProducts={this.props.cartProducts}
                    currency={this.props.currency}
                    showModal={this.state.showModal}
                    addQuantity={this.props.addQuantity}
                    subtractQuantity={this.props.subtractQuantity}
                  />
                </div>
                <div className={styles.modal_buttons}>
                  <Link
                    to="/cart"
                    className={styles.cart_btn}
                    onClick={this.toggleModal}
                  >
                    View Bag
                  </Link>
                  <Link
                    to="/fake_link"
                    className={styles.checkout_btn}
                    onClick={this.toggleModal}
                  >
                    Check Out
                  </Link>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
