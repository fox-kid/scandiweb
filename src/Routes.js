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
    const addedProduct = this.state.cartProducts.find(
      (item) => item.id === props.info.id
    );

    console.log(addedProduct);
    addedProduct
      ? {
          cartProducts: this.state.cartProducts.map((item) => {
            item.id === props.info.id
              ? {
                  ...this.state.cartProducts.item,
                  quantity: item.quantity + 1,
                }
              : item;
          }),
        }
      : this.setState({
          cartProducts: [
            ...this.state.cartProducts,
            { ...props.info, quantity: 1 },
          ],
        });
  }

  render() {
    console.log(this.state.cartProducts);

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
