import { Component } from "react";
import AttributesForm from "../../components/AttributesForm";
import ProductImages from "../../components/ProductImages";
import styles from "./ProductDescription.module.css";
import { fetchProductInfo } from "../../api/products.js";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      chosenPicSrc: "",
      loading: true,
      error: false,
      attributes: [],
    };
    this.updateOptions = this.updateOptions.bind(this);
    this.choosePictureSource = this.choosePictureSource.bind(this);
  }

  updateOptions(attrName, attrValue) {
    // eslint-disable-next-line no-unused-vars
    const addedAttr = this.state.attributes.find((item) =>
      console.log(item.name, attrName)
    );

    // this.state.attributes.map(())
    console.log(attrName, attrValue);
  }

  choosePictureSource(src) {
    this.setState(src);
  }

  componentDidMount() {
    fetchProductInfo(this.props.match.params.id)
      .then((data) => {
        this.setState({
          loading: false,
          info: data.data.product,
          error: false,
          attributes: [],
        });
      })
      .catch((err) => this.setState({ loading: false, error: err.message }));
  }

  render() {
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
                  />
                ) : null}
              </div>

              <div className={styles.product_price}>
                Price:
                {this.state.info.prices
                  .filter((price) => price.currency.label === "USD")
                  .map((filteredPrice, index) => (
                    <span key={index} className={styles.price_amount}>
                      {filteredPrice.currency.symbol}
                      {filteredPrice.amount}
                    </span>
                  ))}
              </div>
              <button
                className={styles.btn_primary}
                type="submit"
                onClick={() => this.props.addToCart(this.state)}
              >
                Add to cart
              </button>
              <div
                className={styles.product_description}
                dangerouslySetInnerHTML={{
                  __html: this.state.info.description,
                }}
              ></div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default ProductDescription;
