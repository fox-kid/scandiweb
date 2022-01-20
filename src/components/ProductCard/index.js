import { PureComponent } from "react";
import styles from "./ProductCard.module.css";
import empty_cart_white from "../../assets/images/empty_cart_white.png";
import { Link } from "react-router-dom";
// Not rounding price on this page since it was not stated so in the task or your email,
// probably because they're already rounded or just shouldn't be.
class ProductCard extends PureComponent {
  render() {
    return this.props.products.map((product) => (
      <Link
        to={`/product/${product.id}`}
        key={product.id}
        className={
          product.inStock
            ? styles.product_card
            : `${styles.product_card} ${styles.out_of_stock}`
        }
      >
        <div className={styles.product_card_box}>
          <div className={styles.product_img}>
            <img src={product.gallery[0]} alt={product.name} />
          </div>
          <h4 className={styles.product_title}>
            {`${product.brand} ${product.name}`}
          </h4>
          {product.prices
            .filter((price) => price.currency.symbol === this.props.currency)
            .map((filteredPrice, index) => (
              <p key={index} className={styles.product_price}>
                {filteredPrice.currency.symbol}
                {filteredPrice.amount}
              </p>
            ))}
          <button className={styles.product_cart_btn}>
            <img src={empty_cart_white} alt="cart" />
          </button>
        </div>
      </Link>
    ));
  }
}

export default ProductCard;
