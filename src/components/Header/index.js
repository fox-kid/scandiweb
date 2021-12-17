import { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import ROUTES from "../../constants/routes";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";

const CATEGORIES = `
{
  categories {
    name
  }
}`;

const CURRENCIES = `
{
  currencies {
    label
    symbol
  }
}`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], currencies: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: CATEGORIES }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data.data.categories }));
    fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: CURRENCIES }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ currencies: data.data.currencies }));
  }

  render() {
    console.log(this.state);
    return (
      <header>
        <div className={styles.container}>
          <nav>
            <ul className={styles.navigation}>
              {this.state.categories.map((category) => (
                <li key={category.name}>
                  <NavLink to={`/listing/${category.name}`}>
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Link to={ROUTES.PAGE_PRODUCT_LISTING}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
