import { Component } from "react";
import styles from "./Cart.module.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cartProducts,
    };
  }
  render() {
    console.log(this.state.cart);
    return (
      <div className={styles.container}>
        <span className={styles.cart_title}>Cart</span>
        <div className={styles.cart_wrapper}>
          {!this.state.cart.length ? <p>The cart is empty</p> : null}
          {this.props.cartProducts.map((item, index) => (
            <div key={index} className={styles.cart_product}>
              <div className={styles.product_brand}>{item.brand}</div>
              <div className={styles.product_name}>{item.name}</div>
              <div className={styles.product_price}>
                {item.prices
                  .filter((price) => price.currency.label === "USD")
                  .map((filteredPrice, index) => (
                    <div key={index} className={styles.price_amount}>
                      {filteredPrice.currency.symbol}
                      {filteredPrice.amount}
                    </div>
                  ))}
              </div>
              {/* <div className={styles.product_attributes}>{item.attributes.map((attr) => )}</div> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cart;
