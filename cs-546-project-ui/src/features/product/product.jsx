import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import ProductAccordion from './productAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setCreateProductStatus } from '../../redux/product.reducer';
import { useState } from 'react';
import { debounce, get } from 'lodash';

export default function Product() {
  const [open, setOpen] = useState(false);
  const productState = useSelector((state) => state.products);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const [department, setDepartment] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const lookups = useSelector((state) => state.lookups);
  useEffect(() => {
    if (productState.fetchProducts) filterProducts();
  }, [productState.fetchProducts]);

  const filterProducts = () => {
    dispatch(getProducts({ params: { name: search, department, category, subCategory } }));
  };
  useEffect(() => {
    const deb = debounce(() => {
      filterProducts();
    }, 1000);
    deb();
  }, [search]);
  return (
    <Box margin={3}>
      <Grid container justifyContent="space-between">
        <Grid flexGrow={1} item marginRight={2}>
          <TextField
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            margin="normal"
            fullWidth
            id="search"
            label="Search Product"
            name="search"
            autoFocus
          />
        </Grid>
        <Grid display="flex" flex={2} item margin={1} alignItems="center">
          <Autocomplete
            options={Object.keys(lookups.hierarchy)}
            fullWidth
            required
            id="department"
            value={department}
            onInputChange={(event, department) => {
              setDepartment(department || undefined);
              filterProducts();
            }}
            renderInput={(params) => <TextField {...params} label="Department" />}
          />
        </Grid>
        <Grid display="flex" flex={2} item margin={1} alignItems="center">
          <Autocomplete
            options={Object.keys(get(lookups.hierarchy, department, []))}
            fullWidth
            required
            id="category"
            value={category}
            onInputChange={(event, category) => {
              setCategory(category || undefined);
              filterProducts();
            }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </Grid>
        <Grid display="flex" flex={2} item margin={1} alignItems="center">
          <Autocomplete
            options={Object.keys(get(lookups.hierarchy, `${department}.${category}`, []))}
            fullWidth
            required
            id="subcategory"
            value={subCategory}
            onInputChange={(event, subcategory) => {
              setSubCategory(subcategory || undefined);
              filterProducts();
            }}
            renderInput={(params) => <TextField {...params} label="Sub Category" />}
          />
        </Grid>
        <Grid item display="flex" alignContent="center" alignItems="center">
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
              dispatch(setCreateProductStatus(false));
            }}
          >
            Create New Product
          </Button>
        </Grid>
      </Grid>
      <Box>
        {open && (
          <ProductAccordion
            onClose={() => setOpen(false)}
            product={{
              name: 'Create a Product',
              department: '',
              category: '',
              subCateggory: '',
              currency: '',
              stock: '',
              price: '',
            }}
          />
        )}
      </Box>
      <Grid
        container
        flex="true"
        justifyContent="space-between"
        sx={{
          paddingLeft: '16px',
          paddingRight: '60px',
          padding: 1,
          borderRadius: '15px',
          backgroundColor: 'primary.main',
          color: 'secondary.main',
        }}
      >
        <Grid item flex={2}>
          <Typography>Product Name</Typography>
        </Grid>
        <Grid item flex={2}>
          <Typography>Department</Typography>
        </Grid>
        <Grid item flex={2}>
          <Typography>Category</Typography>
        </Grid>
        <Grid item flex={2}>
          <Typography>Sub Category</Typography>
        </Grid>
        <Grid item flex={1}>
          <Typography>Stock</Typography>
        </Grid>
        <Grid item flex={1}>
          <Typography>Price</Typography>
        </Grid>
      </Grid>
      <Box>
        {productState.allProducts && productState.allProducts.map((product) => <ProductAccordion product={product} onClose={() => setOpen(false)} />)}
      </Box>
    </Box>
  );
}
