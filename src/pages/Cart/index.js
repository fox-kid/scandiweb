import { Component } from "react";
import styles from "./Cart.module.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cartProducts,
    };
  }
  // addQuantity() {
  //   console.log("add");
  // }

  // subtractQuantity() {
  //   console.log("subtract");
  // }

  render() {
    return (
      <div className={styles.container}>
        <span className={styles.cart_title}>Cart</span>
        <div className={styles.cart_wrapper}>
          {!this.state.cart.length ? <p>The cart is empty</p> : null}
          {this.props.cartProducts.map((item, index) => (
            <div key={index} className={styles.cart_product}>
              <div className={styles.cart_description}>
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
                <div className={styles.product_attributes}>
                  {item.attributes.map((attr) => (
                    <div
                      key={attr.name}
                      className={styles.chosenAttr}
                      style={{
                        backgroundColor:
                          attr.type === "swatch" ? `${attr.value}` : "none",
                      }}
                    >
                      {attr.type !== "swatch" && attr.displayValue}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.cart_quantity}>
                <div className={styles.quantity_editor_box}>
                  <button
                    className={styles.btn_calculator}
                    // onClick={() => addQuantity()}
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.btn_calculator}
                    // onClick={() => subtractQuantity()}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cart;
