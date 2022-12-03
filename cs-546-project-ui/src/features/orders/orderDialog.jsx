import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOwners, getSuppliers } from '../../redux/auth.reducer';

export default function OrderDialog(props) {
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    if (authState.user.role === 'SUPPLIER') {
      dispatch(getOwners());
    } else {
      dispatch(getSuppliers());
    }
  }, []);
  const userDetails = authState.user.role === 'SUPPLIER' ? authState.owners : authState.suppliers;
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Title
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
              value={user}
              onInputChange={(e, val) => setUser(val)}
              renderInput={(params) => (
                <TextField {...params} label={authState.user.role === 'SUPPLIER' ? 'Owner Name' : 'Suplier Name'} />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
