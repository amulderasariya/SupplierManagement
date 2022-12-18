import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Autocomplete, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { createProducts, setErrors } from '../../redux/product.reducer';
export default function ProductCreateDialog(props) {
  const lookups = useSelector((state) => state.lookups);
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const [department, setDepartment] = useState(props.product.department);
  const [productName, setProductName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [stock, setStock] = useState(props.product.stock);
  const [currency, setCurrency] = useState(props.product.currency);
  const [disabledProductFields, setDisableProdFields] = useState(props.product.name !== 'Create a Product');

  const [category, setCategory] = useState(props.product.category);
  const [subCategory, setSubCategory] = useState(props.product.subCategory);
  if (Object.keys(lookups.hierarchy).length !== 0) {
  }
  const resetForm = () => {
    setDepartment();
    setCategory();
    setProductName();
    setSubCategory();
    dispatch(setErrors([]));
  };
  useEffect(() => {
    if (productState.createProductStatus) {
      props.onClose();
    }
  }, [productState.createProductStatus]);
  const onSave = () => {
    //this will not scale
    const product = productState.allProducts.find((prod) => prod.name === productName);
    const payload = {
      stock: stock,
      price: price,
      currency: currency,
    };
    if (product) {
      payload.id = product._id;
    } else {
      payload.name = productName;
      payload.department = department;
      payload.category = category;
      payload.subCategory = subCategory;
    }
    dispatch(createProducts(payload));
  };
  const onProductNameChanged = (event, productName) => {
    setProductName(productName);
    //this will not scale
    const product = productState.allProducts.find((prod) => prod.name === productName);
    if (product) {
      setPrice(product.price);
      setStock(product.quantity);
      setSubCategory(product.subCategory);
      setDepartment(product.department);
      setCategory(product.category);
      setCurrency(product.currency);
      setDisableProdFields(true);
    } else {
      setDisableProdFields(false);
    }
  };
  return (
    <Fragment>
      {Object.keys(lookups.hierarchy).length !== 0 && (
        <Fragment>
          {productState.errors.length > 0 && productState.errors.map((error) => <Alert severity="error">{error.msg}</Alert>)}
          <Grid container maxWidth={true} display="flex" flexDirection="row" justifyContent="space-between">
            <Grid display="flex" flex={2} item margin={1} alignItems="center">
              {/* //this will not scale */}
              <Autocomplete
                options={get(productState, 'allProducts', []).map((product) => ({
                  ...product,
                  id: product._id,
                  label: product.name,
                }))}
                fullWidth
                required
                id="productName"
                value={productName}
                disabled={Boolean(props.product._id)}
                onInputChange={onProductNameChanged}
                renderInput={(params) => <TextField {...params} label="Product Name" />}
              />
            </Grid>
            <Grid display="flex" flex={2} item margin={1} alignItems="center">
              <Autocomplete
                options={Object.keys(lookups.hierarchy)}
                fullWidth
                required
                id="department"
                disabled={disabledProductFields}
                value={department}
                onInputChange={(event, department) => setDepartment(department)}
                renderInput={(params) => <TextField {...params} label="Department" />}
              />
            </Grid>
          </Grid>
          <Grid container maxWidth={true} display="flex" flexDirection="row" justifyContent="space-between">
            <Grid display="flex" flex={2} item margin={1} alignItems="center">
              <Autocomplete
                options={Object.keys(get(lookups.hierarchy, department, []))}
                fullWidth
                required
                id="category"
                value={category}
                disabled={disabledProductFields}
                onInputChange={(event, category) => setCategory(category)}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
            </Grid>
            <Grid display="flex" flex={2} item margin={1} alignItems="center">
              <Autocomplete
                options={Object.keys(get(lookups.hierarchy, `${department}.${category}`, []))}
                fullWidth
                required
                id="subcategory"
                disabled={disabledProductFields}
                value={subCategory}
                onInputChange={(event, subcategory) => setSubCategory(subcategory)}
                renderInput={(params) => <TextField {...params} label="Sub Category" />}
              />
            </Grid>
          </Grid>
          <Grid container maxWidth={true} display="flex" flexDirection="row" justifyContent="space-between">
            <Grid display="flex" flex={2} item margin={1} alignItems="center">
              <TextField
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                fullWidth
                InputLabelProps={{ shrink: !isNaN(stock) }}
                id="stock"
                label="Stock"
                name="Stock"
              />
            </Grid>
            <Grid container flexDirection="row" justifyContent="space-between" display="flex" flex={2} item margin={1} alignItems="center">
              <Grid item flex={1} display="flex" margin={1}>
                <Autocomplete
                  options={Object.keys(get(lookups, 'currencies', []))}
                  fullWidth
                  required
                  id="subcategory"
                  value={currency}
                  onInputChange={(event, currency) => setCurrency(currency)}
                  renderInput={(params) => <TextField {...params} label="Currency" />}
                />
              </Grid>
              <Grid item flex={1} display="flex" margin={1}>
                <TextField
                  value={price}
                  InputLabelProps={{ shrink: !isNaN(price) }}
                  onChange={(event) => setPrice(event.target.value)}
                  fullWidth
                  type="number"
                  id="price"
                  label="Price"
                  name="Price"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid display="flex" alignItems="flex-end" justifyContent="flex-end" gap={2}>
            {!!!props.product._id && (
              <Button variant="outlined" onClick={resetForm}>
                Reset
              </Button>
            )}
            <Button variant="contained" onClick={onSave}>
              Save Changes
            </Button>
          </Grid>
        </Fragment>
      )}
      {Object.keys(lookups.hierarchy).length === 0 && <CircularProgress />}
    </Fragment>
  );
}
