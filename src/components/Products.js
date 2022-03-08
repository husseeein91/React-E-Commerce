import { useState, useEffect } from "react";
import { applyFilter } from "../actions/products";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Grid,
  Rating,
  Card,
  CardMedia,
  CardContent,
  Pagination,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Checkbox,
  Slider,
  Button,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Products = ({ products, category, applyFilter }) => {
  const [count, setCount] = useState(1);
  const [rate, setRate] = useState(5);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filterColors, setFilterColors] = useState([]);

  let colors = products.map((pro) => pro.color);
  colors = [...new Set(colors)];
  let size = Math.round(products.length / 10);
  let productsDisplayed = products.slice(count * 10 - 10, count * 10);

  const handleOnChange = (event, value) => {
    setCount(value);
    productsDisplayed = products.slice(count * 10 - 10, count * 10);
  };
  const handlePriceChange = (event, value) => {
    setPriceRange(value);
  };
  const handleRateChange = (event, value) => {
    setRate(value);
  };
  const handleColorChange = (event, value) => {
    setFilterColors(value);
  };

  const handleApplyFilter = (event, value) => {
    applyFilter(priceRange, rate, filterColors, category);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    setCount(1);
  }, [products]);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography id="non-linear-slider" gutterBottom>
            Price Range
          </Typography>
          <Slider
            getAriaLabel={() => "Price Range"}
            min={0}
            step={100}
            max={1000}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={() => priceRange}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography id="non-linear-slider" gutterBottom>
            Rate
          </Typography>
          <Rating
            color="primary"
            size="medium"
            value={rate}
            onChange={handleRateChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography id="non-linear-slider" gutterBottom>
            Color
          </Typography>
          <Autocomplete
            onChange={handleColorChange}
            value={filterColors}
            multiple
            id="checkboxes-tags-demo"
            options={colors}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  onChange={() => handleColorChange}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Colors"
                placeholder="choose a color"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography mt={5}>
            <Button
              onClick={handleApplyFilter}
              variant="contained"
              fullWidth
              color="primary"
            >
              Apply Filter
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Grid mt={2} container spacing={2}>
        {productsDisplayed.length > 0 &&
          productsDisplayed.map((product) => (
            <Grid xs={4} item key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating readOnly size="small" value={product.rating} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.color}
                  </Typography>
                  <Typography variant="span" color="text.primary">
                    {product.price} {product.currency}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box sx={{ margin: "auto", width: "400px" }}>
        <Pagination
          controlled="true"
          color="primary"
          count={size}
          variant="outlined"
          shape="rounded"
          page={count}
          onChange={handleOnChange}
        />
      </Box>
    </>
  );
};

Products.propTypes = {
  applyFilter: PropTypes.func.isRequired,
};

export default connect(null, { applyFilter })(Products);
