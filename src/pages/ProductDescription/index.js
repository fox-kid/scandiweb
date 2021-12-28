import { Component } from "react";
import styles from "./ProductDescription.module.css";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      chosenPickSrc: "",
      loading: true,
      error: false,
    };
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
    console.log(this.state.info);
    return (
      <section className={styles.container}>
        {this.state.loading && <p>Content is loading. Please wait</p>}
        {this.state.error && (
          <p>There was some error. Please choose a product</p>
        )}
        {this.state.info && (
          <div className={styles.product_info_box}>
            <div className={styles.product_images}>
              <div className={styles.product_images_carousel}>
                {this.state.info.gallery.map((image) => (
                  <div
                    key={image}
                    className={styles.carousel_image}
                    onClick={() => this.setState({ chosenPickSrc: image })}
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
              </div>
            </div>
            <div className={styles.product_description}>
              <h2 className={styles.product_brand}>{this.state.info.brand}</h2>
              <h3 className={styles.product_name}>{this.state.info.name}</h3>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default ProductDescription;
