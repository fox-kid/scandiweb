import { Component } from "react";
import styles from "./ProductListing.module.css";

const PRODUCTS = `
{
  categories {
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
        }
        amount 
      }
    }
  }
}`;

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCTS }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({ products: data.data.categories[0].products })
      );
  }

  render() {
    console.log(this.state);

    return (
      <main>
        <div className={styles.container}>
          <h1>All</h1>
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
