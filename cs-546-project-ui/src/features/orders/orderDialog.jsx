import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Grid, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOwners, getSuppliers } from '../../redux/auth.reducer';
import { get } from 'lodash';
import { getProducts } from '../../redux/product.reducer';
import { createOrders } from '../../redux/order.reducer';

export default function OrderDialog(props) {
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const lookups = useSelector((state) => state.lookups);
  const productState = useSelector((state) => state.products);
  const orderState = useSelector((state) => state.orders);

  const [currency, setCurrency] = useState('USD');
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getSuppliers());
  }, []);
  useEffect(() => {
    if (orderState.createOrderStatus) {
      handleDialogClose();
    }
  }, [orderState.createOrderStatus]);
  useEffect(() => {
    if (user) {
      dispatch(getProducts({ params: { supplierID: user.id } }));
      setInvoiceProducts([]);
    }
  }, [user]);

  const resetForm = () => {
    setUser('');
    setInvoiceProducts([]);
  };
  const handleDialogClose = () => {
    resetForm();
    handleClose();
  };
  const saveForm = () => {
    const payload = {
      supplierID: user.id,
      currency: currency,
      invoiceProducts,
    };
    dispatch(createOrders(payload));
  };
  const userDetails = authState.suppliers;
  return (
    <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create a invoice
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container maxWidth={true} display="flex" flexDirection="row" justifyContent="space-between">
          <Grid item display="flex" flex={2} margin={1} alignItems="center">
            <Autocomplete
              options={userDetails.map((user) => ({
                id: user._id,
                label: user.email,
              }))}
              fullWidth
              required
              id="productName"
              value={user.label}
              onChange={(e, val) => setUser(val)}
              renderInput={(params) => <TextField {...params} label={authState.user.role === 'SUPPLIER' ? 'Owner Name' : 'Suplier Name'} />}
            />
          </Grid>
          <Grid item flex={1} display="flex" margin={1}>
            <Autocomplete
              options={Object.keys(get(lookups, 'currencies', []))}
              fullWidth
              required
              id="subcategory"
              value={currency}
              onChange={(event, currency) => setCurrency(currency)}
              renderInput={(params) => <TextField {...params} label="Currency" />}
            />
          </Grid>
        </Grid>
        <Grid container maxWidth={true} display="flex" flexDirection="row" justifyContent="space-between">
          <Grid item flex={1} display="flex" margin={1}>
            <Button
              variant="contained"
              onClick={() => {
                setInvoiceProducts([...invoiceProducts, { productID: '', producName: '', quantity: 0 }]);
              }}
            >
              Add a product
            </Button>
          </Grid>
        </Grid>
        {invoiceProducts.map((product, i) => (
          <Grid container maxWidth={true} display="flex" flexDirection="row" justifyContent="space-between">
            <Grid item flex={1} display="flex" margin={1}>
              <Autocomplete
                options={get(productState, 'allProducts', []).map((product) => ({
                  ...product,
                  id: product._id,
                  label: product.name,
                }))}
                fullWidth
                required
                id="productName"
                value={product.producName}
                onChange={(e, product) => {
                  invoiceProducts[i].producName = product.label;
                  invoiceProducts[i].productID = product._id;
                  setInvoiceProducts([...invoiceProducts]);
                }}
                renderInput={(params) => <TextField {...params} label="Product Name" />}
              />
            </Grid>
            <Grid display="flex" flex={2} item margin={1} alignItems="center">
              <TextField
                value={product.quantity}
                onChange={(e, quantity) => {
                  invoiceProducts[i].quantity = e.target.value;
                  setInvoiceProducts([...invoiceProducts]);
                }}
                fullWidth
                InputLabelProps={{ shrink: !isNaN(product.quantity) }}
                id="quantity"
                label="Quantity"
                name="Quantity"
              />
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={saveForm}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
