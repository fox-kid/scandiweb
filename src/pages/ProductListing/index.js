import { Component } from "react";
import styles from "./ProductListing.module.css";

let category = "all"; //default category

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      products: [],
    };
  }

  fetchItems() {
    const PRODUCTS_QUERY = `
        {
          category(input: { title: "${category}" }){
            name
              products {
              id
              name
              inStock
              gallery
              category
              brand
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
            }
          }
        }`;
    fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCTS_QUERY }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          name: data.data.category.name,
          products: data.data.category.products,
        })
      );
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== window.location.pathname) {
      category = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      this.fetchItems();
    }
  }

  render() {
    return (
      <main>
        <div className={styles.container}>
          <h1 className={styles.products_category_name}>{this.state.name}</h1>
          <section className={styles.products_box}>
            {this.state.products.map((product) => (
              <div
                key={product.id}
                className={
                  product.inStock
                    ? styles.product_card
                    : `${styles.product_card} ${styles.out_of_stock}`
                }
              >
                <div className={styles.product_img}>
                  <img src={product.gallery[0]} alt={product.name} />
                </div>
                <h4 className={styles.product_title}>
                  {`${product.brand} ${product.name}`}
                </h4>
                {product.prices
                  .filter((price) => price.currency.label === "USD")
                  .map((filteredPrice) => (
                    <p
                      key={filteredPrice.amount}
                      className={styles.pruduct_price}
                    >
                      {filteredPrice.currency.symbol}
                      {filteredPrice.amount}
                    </p>
                  ))}
              </div>
            ))}
          </section>
        </div>
      </main>
    );
  }
}

export default ProductListing;
