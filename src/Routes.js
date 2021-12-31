import { Component } from "react";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from "./config/routes";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
    };
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(props) {
    const product = props.info;
    const addedProduct = this.state.cartProducts.find(
      (item) => item.id === product.id
    );

    addedProduct
      ? this.state.cartProducts.map((item) => {
          item.id === product.id
            ? { ...item, quantity: item.quantity++ }
            : item;
        })
      : this.setState({
          cartProducts: [
            ...this.state.cartProducts,
            { ...product, quantity: 1 },
          ],
        });
    console.log(props);
  }

  render() {
    return (
      <>
        <Header
          cartProducts={this.state.cartProducts}
          addToCart={this.addToCart}
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
                    addToCart={this.addToCart}
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
