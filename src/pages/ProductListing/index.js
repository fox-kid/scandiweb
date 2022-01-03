import { Component } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../api/products.js";
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

  fetchProductsFunction() {
    fetchProducts(this.props.match.params.category)
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
    this.fetchProductsFunction();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.fetchProductsFunction();
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
              <ProductCard
                products={this.state.products}
                currency={this.props.currency}
              />
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default ProductListing;
