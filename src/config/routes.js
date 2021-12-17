import ROUTES from "../constants/routes";
import ProductListing from "../pages/ProductListing";
import ProductDescription from "../pages/ProductDescription";
import Cart from "../pages/Cart";

export default [
  {
    path: ROUTES.PAGE_PRODUCT_LISTING,
    exact: false,
    page: ProductListing,
  },
  {
    path: ROUTES.PAGE_PRODUCT_DESCRIPTION,
    exact: false,
    page: ProductDescription,
  },
  { path: ROUTES.CART, exact: false, page: Cart },
];
