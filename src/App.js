import "./App.css";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getCategories, getCategory, getProducts } from "./actions/products";
import PropTypes from "prop-types";
import { Container, ButtonGroup, Button, Typography, Box } from "@mui/material";
import Navbar from "./components/layouts/Navbar";
import Products from "./components/Products";
import Spinner from "./components/layouts/Spinner";

function App({ getCategories, getCategory, getProducts }) {
  useEffect(() => {
    getCategories();
    getProducts();
  }, [getCategories, getProducts]);
  const selected = {
    backgroundColor: "#bbdefb",
  };
  const loading = useSelector((state) => state.products.loading);
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);
  const category = useSelector((state) => state.products.category);
  const categoryProducts = useSelector(
    (state) => state.products.categoryProducts
  );

  return (
    <>
      <Navbar />
      {!loading ? (
        <Container align="center">
          <Typography variant="h4" mt={2} mb={2} color="primary">
            {" "}
            All Products{" "}
          </Typography>
          <Box mb={2}>
            <ButtonGroup
              variant="text"
              size="large"
              aria-label="text button group"
            >
              <Button
                sx={categoryProducts.length > 0 ? {} : selected}
                onClick={() => getCategory(0)}
              >
                All
              </Button>
              {!loading &&
                categories.length > 0 &&
                categories.map((cat) => (
                  <Button
                    onClick={() => getCategory(cat.id)}
                    key={cat.id}
                    sx={
                      categoryProducts.length > 0 && category === cat.id
                        ? selected
                        : {}
                    }
                  >
                    {cat.name}
                  </Button>
                ))}
            </ButtonGroup>
          </Box>
          <Products
            products={categoryProducts.length > 0 ? categoryProducts : products}
            category={category !== null ? category : 0}
          />
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
}

App.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};

export default connect(null, { getCategories, getCategory, getProducts })(App);
