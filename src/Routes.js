import { PureComponent } from "react";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import { Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from "./config/routes";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const currencyFromLocalStorage = JSON.parse(localStorage.getItem("currency"));
const equal = require("deep-equal");

class Routes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: cartFromLocalStorage,
      currency: currencyFromLocalStorage || "$",
    };
    this.changeCurrency = this.changeCurrency.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
  }

  changeCurrency(label) {
    this.setState({ currency: label });
    localStorage.setItem("currency", JSON.stringify(label));
  }

  addToCart(props) {
    const product = props.info;
    const addedProduct = this.state.cartProducts
      .filter((item) => item.id === product.id)
      .find((added) => equal(added.attributes, props.attributes));

    addedProduct &&
      this.state.cartProducts.map((item) => {
        item.id === product.id && equal(item.attributes, props.attributes)
          ? {
              ...item,
              quantity: item.quantity++,
            }
          : item;
      });

    const updatedCart =
      this.state.cartProducts.length &&
      this.state.cartProducts.filter((item) => item.quantity > 0 && item);

    addedProduct
      ? this.setState((prevState) => ({
          ...prevState.cartProducts,
          cartProducts: updatedCart,
        }))
      : this.setState({
          cartProducts: [
            ...this.state.cartProducts,
            { ...product, quantity: 1, attributes: props.attributes },
          ],
        });

    localStorage.setItem(
      "cart",
      JSON.stringify(
        this.state.cartProducts.length ? this.state.cartProducts : [product]
      )
    );
  }

  addQuantity(product) {
    this.state.cartProducts.map((item) => {
      item.id === product.id && equal(item.attributes, product.attributes)
        ? {
            ...item,
            quantity: item.quantity++,
          }
        : item;
    });

    const updatedCart =
      this.state.cartProducts.length &&
      this.state.cartProducts.filter((item) => item.quantity > 0 && item);

    this.setState((prevState) => ({
      ...prevState.cartProducts,
      cartProducts: updatedCart,
    }));
  }

  subtractQuantity(product) {
    this.state.cartProducts.map((item) => {
      item.id === product.id && equal(item.attributes, product.attributes)
        ? {
            ...item,
            quantity: item.quantity--,
          }
        : item;
    });

    const updatedCart =
      this.state.cartProducts.length &&
      this.state.cartProducts.filter((item) => item.quantity > 0 && item);

    this.state.cartProducts.length &&
      this.setState((prevState) => ({
        ...prevState.cartProducts,
        cartProducts: updatedCart,
      }));

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  render() {
    return (
      <>
        <Header
          cartProducts={this.state.cartProducts}
          currency={this.state.currency}
          addToCart={this.addToCart}
          changeCurrency={this.changeCurrency}
          addQuantity={this.addQuantity}
          subtractQuantity={this.subtractQuantity}
          totalPrice={this.state.total}
        />
        <Switch>
          {ROUTES_CONFIG.map((route, index) => {
            const Page = route.page;

            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  <Page
                    {...props}
                    cartProducts={this.state.cartProducts}
                    currency={this.state.currency}
                    addToCart={this.addToCart}
                    addQuantity={this.addQuantity}
                    subtractQuantity={this.subtractQuantity}
                  />
                )}
              />
            );
          })}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  }
}

export default Routes;
