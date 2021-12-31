function fetchCategories() {
  const CATEGORIES = `
  {
    categories {
      name
    }
  }`;

  const response = fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: CATEGORIES }),
  }).then((res) => res.json());

  return response;
}

function fetchCurrencies() {
  const CURRENCIES = `
{
  currencies {
    label
    symbol
  }
}`;

  const response = fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: CURRENCIES }),
  }).then((res) => res.json());

  return response;
}

function fetchProducts(props) {
  // on start page sends request to category "all" by default
  const PRODUCTS_QUERY = `
        {
          category(input: { title: "${props || "all"}" }){
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

  const response = fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
  }).then((res) => res.json());

  return response;
}

function fetchProductInfo(props) {
  const PRODUCT_INFO_QUERY = `
        {
          product(id: "${props}") {
            id
            name
            inStock
            description
            category
            gallery
            attributes {
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            brand
            prices {
              currency {
                label
                symbol
              }
              amount
            }
          }
        }`;

  const response = fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: PRODUCT_INFO_QUERY }),
  }).then((res) => res.json());
  return response;
}

export { fetchCategories, fetchCurrencies, fetchProductInfo, fetchProducts };
