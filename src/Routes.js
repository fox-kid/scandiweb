import { Component } from "react";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from "./config/routes";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      currency: "$",
    };
    this.changeCurrency = this.changeCurrency.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
  }

  changeCurrency(label) {
    this.setState({ currency: label });
  }

  addToCart(props) {
    const product = props.info;
    const addedProduct = this.state.cartProducts.find(
      (item) => item.id === product.id
    );

    addedProduct
      ? this.state.cartProducts.map((item) => {
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity++,
              }
            : item;
        })
      : this.setState({
          cartProducts: [
            ...this.state.cartProducts,
            { ...product, quantity: 1, attributes: props.attributes },
          ],
        });
  }

  subtractQuantity(product) {
    this.state.cartProducts.length &&
      this.state.cartProducts.map((item) => {
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity--,
            }
          : item;
      });
    const updatedCart =
      this.state.cartProducts.length &&
      this.state.cartProducts.filter((item) =>
        item.quantity > 0 ? item : null
      );
    this.state.cartProducts.length &&
      this.setState({ ...this.state.cartProducts, cartProducts: updatedCart });
  }

  render() {
    return (
      <>
        <Header
          cartProducts={this.state.cartProducts}
          addToCart={this.addToCart}
          changeCurrency={this.changeCurrency}
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
                    subtractQuantity={this.subtractQuantity}
                  />
                )}
              />
            );
          })}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </>
    );
  }
}

export default Routes;
