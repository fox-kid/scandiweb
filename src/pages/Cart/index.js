import { Component } from "react";
import styles from "./Cart.module.css";
import plus_square from "../../assets/images/plus-square.png";
import minus_square from "../../assets/images/minus-square.png";
import Carousel from "../../components/Carousel";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { imgIndex: 0 };
    this.addQuantity = this.addQuantity.bind(this);
  }

  addQuantity(product) {
    this.props.cartProducts.map((item) => {
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity++,
          }
        : item;
    });
    this.forceUpdate(); // Needed because the quantity display wouldn't update
  }

  // Subtracting is in the component above because it was better to update the state there

  render() {
    return (
      <div className={styles.container}>
        <span className={styles.cart_title}>Cart</span>
        <div className={styles.cart_wrapper}>
          {!this.props.cartProducts.length ? <p>The cart is empty</p> : null}
          {this.props.cartProducts.map((item, index) => (
            <div key={index} className={styles.cart_product}>
              <div className={styles.cart_product_left}>
                <div className={styles.cart_description}>
                  <div className={styles.product_brand}>{item.brand}</div>
                  <div className={styles.product_name}>{item.name}</div>
                  <div className={styles.product_price}>
                    {item.prices
                      .filter(
                        (price) => price.currency.symbol === this.props.currency
                      )
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
              </div>
              <div className={styles.cart_product_right}>
                <div className={styles.cart_quantity}>
                  <div className={styles.quantity_editor_box}>
                    <button
                      className={styles.btn_calculator}
                      onClick={() => this.addQuantity(item)}
                    >
                      <img src={plus_square} alt="plus_button" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={styles.btn_calculator}
                      onClick={() => this.props.subtractQuantity(item)}
                    >
                      <img src={minus_square} alt="minus_button" />
                    </button>
                  </div>
                </div>
                <Carousel images={item.gallery} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cart;
