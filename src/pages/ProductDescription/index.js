import { PureComponent } from "react";

import { fetchProductInfo } from "../../api/products.js";
import AttributesForm from "../../components/AttributesForm";
import ProductImages from "../../components/ProductImages";
import styles from "./ProductDescription.module.css";

class ProductDescription extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      chosenPicSrc: "",
      loading: true,
      error: false,
      attributes: [],
      choseAllAttributes: true,
      submitted: false,
    };
    this.updateOptions = this.updateOptions.bind(this);
    this.choosePictureSource = this.choosePictureSource.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  updateOptions(props) {
    const addedAttr = this.state.attributes.find(
      (item) => item.name === props.name
    );

    let attributes = [...this.state.attributes];
    let index = attributes.findIndex((attr) => attr.name === props.name);
    attributes[index] = {
      ...attributes[index],
      value: props.value,
      displayValue: props.displayValue,
    };

    addedAttr
      ? this.setState({ attributes })
      : this.setState((prevState) => ({
          attributes: [...prevState.attributes, props],
        }));
  }

  choosePictureSource(src) {
    this.setState(src);
  }

  handleAddToCart(state) {
    let shouldExistAttr = state.info.attributes;
    if (shouldExistAttr.length === state.attributes.length) {
      this.setState({ choseAllAttributes: true, submitted: true });
      this.props.addToCart(state);
    } else {
      this.setState({ choseAllAttributes: false });
    }
  }

  componentDidMount() {
    fetchProductInfo(this.props.match.params.id)
      .then((data) => {
        this.setState({
          loading: false,
          info: data.data.product,
          error: false,
        });
      })
      .catch((err) => this.setState({ loading: false, error: err.message }));
  }

  render() {
    const description = `${this.state.info.description}`;
    return (
      <section className={styles.container}>
        {this.state.loading && <p>Content is loading. Please wait</p>}
        {this.state.error && (
          <p>There was some error. Please choose a product</p>
        )}
        {this.state.info && (
          <div className={styles.product_info_box}>
            <div className={styles.product_images}>
              <ProductImages
                values={this.state.info.gallery}
                chosenPicSrc={this.state.chosenPicSrc}
                choosePic={this.choosePictureSource}
              />
            </div>
            <div className={styles.product_description}>
              <h2 className={styles.product_brand}>{this.state.info.brand}</h2>
              <h3 className={styles.product_name}>{this.state.info.name}</h3>
              <div className={styles.product_attributes}>
                {this.state.info.attributes.length ? (
                  <AttributesForm
                    values={this.state.info.attributes}
                    updateSelectedOptions={this.updateOptions}
                    attributes={this.state.attributes}
                  />
                ) : null}
              </div>

              <div className={styles.product_price}>
                Price:
                {this.state.info.prices
                  .filter(
                    (price) => price.currency.symbol === this.props.currency
                  )
                  .map((filteredPrice, index) => (
                    <span key={index} className={styles.price_amount}>
                      {filteredPrice.currency.symbol}
                      {filteredPrice.amount}
                    </span>
                  ))}
              </div>
              <div className={styles.submit_wrapper}>
                {!this.state.choseAllAttributes && (
                  <p className={`${styles.submit_text} ${styles.submit_error}`}>
                    *Please choose your options for all the attributes.
                  </p>
                )}
                {this.state.submitted && (
                  <p
                    className={`${styles.submit_text} ${styles.submit_success}`}
                  >
                    Item was added to your cart.
                  </p>
                )}
                {!this.state.info.inStock && (
                  <p className={`${styles.submit_text} ${styles.submit_error}`}>
                    *Item is out of stock.
                  </p>
                )}
                <button
                  className={styles.btn_primary}
                  type="submit"
                  onClick={() =>
                    this.state.info.inStock && this.handleAddToCart(this.state)
                  }
                >
                  Add to cart
                </button>
              </div>
              <div className={styles.product_description}>{description}</div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default ProductDescription;
