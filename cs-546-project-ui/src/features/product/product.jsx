import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Button, Grid, TextField, Typography } from '@mui/material';
import ProductAccordion from './productAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setCreateProductStatus } from '../../redux/product.reducer';
import { useState } from 'react';
import { debounce } from 'lodash';

export default function Product() {
  const [open, setOpen] = useState(false);
  const productState = useSelector((state) => state.products);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (productState.fetchProducts) dispatch(getProducts());
  }, [productState.fetchProducts]);

  useEffect(() => {
    const deb = debounce(() => {
      dispatch(getProducts({ params: { name: search } }));
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
