import { Component } from "react";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from "./config/routes";

class Routes extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          {ROUTES_CONFIG.map((route) => {
            const Page = route.page;

            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={(props) => <Page {...props} />}
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
