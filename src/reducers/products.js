import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_CATEGORIES,
  GET_CATEGORY,
  APPLY_FILTER,
} from "../actions/types";

const initialState = {
  products: [],
  categories: [],
  category: null,
  categoryProducts: [],
  product: null,
  loading: true,
  errors: [],
};

const products = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case APPLY_FILTER:
      return {
        ...state,
        products: payload.filteredProducts,
        categoryProducts: payload.categoryProducts,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        category: null,
        categoryProducts: [],
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        categoryProducts: state.products.filter(
          (product) => product.categoryId === payload
        ),
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default products;
