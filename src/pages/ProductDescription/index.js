import { Component } from "react";
import AttributesForm from "../../components/AttributesForm";
import ProductImages from "../../components/ProductImages";
import styles from "./ProductDescription.module.css";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      chosenPicSrc: "",
      loading: true,
      error: false,
    };
    this.updateOptions = this.updateOptions.bind(this);
    this.choosePictureSource = this.choosePictureSource.bind(this);
  }

  updateOptions(chosenOptions) {
    this.setState(chosenOptions);
  }

  choosePictureSource(src) {
    this.setState(src);
  }

  fetchProductInfo() {
    const PRODUCT_INFO_QUERY = `
        {
          product(id: "${this.props.match.params.id}") {
            id
            name
            inStock
            description
            category
            gallery
            attributes {
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            brand
            prices {
              amount
            }
          }
        }`;

    fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCT_INFO_QUERY }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          loading: false,
          info: data.data.product,
          error: false,
        });
      })
      .catch((err) => this.setState({ loading: false, error: err.message }));
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  render() {
    console.log(this.state);
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
              {/* <div className={styles.product_images_carousel}>
                {this.state.info.gallery.map((image) => (
                  <div
                    key={image}
                    className={styles.carousel_image}
                    onClick={() => this.setState({ chosenPicSrc: image })}
                    role="presentation"
                    onKeyDown={this.handleKeyDown}
                  >
                    <img src={image} alt={`${this.state.info.name}`} />
                  </div>
                ))}
              </div>
              <div className={styles.product_image_chosen}>
                <img
                  src={
                    this.state.chosenPickSrc
                      ? this.state.chosenPickSrc
                      : this.state.info.gallery[0]
                  }
                  alt={`${this.state.info.name}`}
                />
              </div> */}
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
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default ProductDescription;
