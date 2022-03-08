import axios from "axios";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_CATEGORY,
  GET_CATEGORIES,
  PRODUCT_ERROR,
  APPLY_FILTER,
} from "./types";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("https://test-api.edfa3ly.io/product");
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    dispatch({ type: PRODUCT_ERROR, payload: err.message });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("https://test-api.edfa3ly.io/category");
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch (err) {
    dispatch({ type: PRODUCT_ERROR, payload: err.message });
  }
};

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY, payload: id });
  } catch (err) {
    dispatch({ type: PRODUCT_ERROR, payload: err.message });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://test-api.edfa3ly.io/product/${id}`);
    dispatch({ type: GET_PRODUCT, payload: res.data });
  } catch (err) {
    dispatch({ type: PRODUCT_ERROR, payload: err.message });
  }
};

export const applyFilter =
  (priceRange, rating, colors, category) => async (dispatch) => {
    const res = await axios.get("https://test-api.edfa3ly.io/product");
    let filteredProducts = res.data.filter(
      (pr) =>
        (pr.rating <= rating) &
        (pr.price < priceRange[1]) &
        (pr.price > priceRange[0])
    );
    let categoryProducts = [];
    if (category !== 0) {
      categoryProducts = res.data.filter(
        (pr) =>
          (pr.rating <= rating) &
          (pr.price < priceRange[1]) &
          (pr.price > priceRange[0]) &
          (pr.categoryId === category)
      );
    }
    if (colors.length > 0) {
      filteredProducts = filteredProducts.filter((pr) =>
        colors.includes(pr.color)
      );
      categoryProducts = categoryProducts.filter((pr) =>
        colors.includes(pr.color)
      );
    }
    dispatch({
      type: APPLY_FILTER,
      payload: { filteredProducts, categoryProducts },
    });
  };
