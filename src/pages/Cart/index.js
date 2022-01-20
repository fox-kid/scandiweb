import { Component } from "react";
import styles from "./Cart.module.css";
import plus_square from "../../assets/images/plus_square.png";
import minus_square from "../../assets/images/minus_square.png";
import Carousel from "../../components/Carousel";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
  }

  // Subtracting is in the component above
  // because it was better to update the state there.
  // For consistency reasons adding is in above component, too.

  render() {
    const totalPrice = this.props.cartProducts.reduce(
      (previousValue, currentValue) => {
        const amount =
          previousValue +
          currentValue.quantity *
            currentValue.prices.filter(
              (price) => price.currency.symbol === this.props.currency
            )[0].amount;

        return amount;
      },
      0
    );
    console.log(totalPrice);
    return (
      <div
        className={`${styles.container} ${
          this.props.showModal && styles.modal_cart
        }`}
        style={{ marginTop: this.props.showModal ? "0px" : "160px" }}
      >
        {this.props.totalPrice}
        {!this.props.showModal && (
          <span className={styles.cart_title}>Cart</span>
        )}
        <div
          className={styles.cart_wrapper}
          style={{ marginTop: this.props.showModal ? "0px" : "160px" }}
        >
          {!this.props.cartProducts.length ? (
            <p className={styles.cart_empty}>The cart is empty</p>
          ) : null}
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
                          {+filteredPrice.amount.toFixed(2)}
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
                        {attr.type !== "swatch" && attr.value}
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
                      onClick={() => this.props.addQuantity(item)}
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
                <Carousel
                  images={item.gallery}
                  showModal={this.props.showModal}
                />
              </div>
            </div>
          ))}
        </div>
        {this.props.showModal && (
          <div className={styles.total_price}>
            Total:
            <span className={styles.total_price_amount}>
              {this.props.currency}
              {+totalPrice.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
