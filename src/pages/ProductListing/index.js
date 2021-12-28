import { Component } from "react";
import ProductCard from "../../components/ProductCard";
import styles from "./ProductListing.module.css";

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      products: [],
      loading: true,
      error: false,
    };
  }

  fetchProducts() {
    // on start page sends request to category "all" by default
    const PRODUCTS_QUERY = `
        {
          category(input: { title: "${
            this.props.match.params.category || "all"
          }" }){
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
          loading: false,
          name: data.data.category.name,
          products: data.data.category.products,
          error: false,
        })
      )
      .catch((err) => this.setState({ loading: false, error: err.message }));
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.fetchProducts();
    }
  }

  render() {
    return (
      <main>
        <section className={styles.container}>
          <h1 className={styles.products_category_name}>{this.state.name}</h1>
          <div className={styles.products_box}>
            {this.state.loading && <p>Content is loading. Please wait</p>}
            {this.state.error && (
              <p>There was some error. Please choose a category</p>
            )}
            {this.state.products && (
              <ProductCard products={this.state.products} />
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default ProductListing;
