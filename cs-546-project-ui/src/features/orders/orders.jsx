import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderTable from './orderTable';
import OrderDialog from './orderDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/order.reducer';

export default function Orders() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const orderState = useSelector((state) => state.orders);
  useEffect(() => {
    if (orderState.fetchOrders) dispatch(getOrders());
  }, [orderState.fetchOrders]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const pendingColumns = [user.role === 'SUPPLIER' ? 'ownerName' : 'supplierName', 'currency', 'gross_amount'];
  const approvedColumns = [
    user.role === 'SUPPLIER' ? 'ownerName' : 'supplierName',
    'currency',
    'gross_amount',
    'net_amount',
    'paidAmount',
    'paymentStatus',
  ];
  if (user.role === 'SUPPLIER') {
    pendingColumns.push('pendingAmountPaid', 'pendingDueDate', 'pendingNetAmount', 'approveButton');
  }
  if (user.role === 'OWNER') {
    approvedColumns.push('deliveredDate', 'completeButton');
  }
  return (
    <Box margin={3}>
      <OrderDialog open={open} handleClose={handleClose} />
      <Grid container justifyContent="space-between">
        <Grid flexGrow={1} item marginRight={2}>
          <TextField margin="normal" fullWidth id="search" label="Search Orders" name="search" autoFocus />
        </Grid>
        <Grid item display="flex" alignContent="center" alignItems="center">
          {user.role === 'OWNER' && (
            <Button variant="contained" onClick={handleClickOpen}>
              Create New Order
            </Button>
          )}
        </Grid>
      </Grid>
      <Accordion m={1}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Pending orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orderState.allOrders.PENDING.length > 0 ? <OrderTable columns={pendingColumns} rows={orderState.allOrders.PENDING} /> : <div>No data</div>}
        </AccordionDetails>
      </Accordion>
      <Accordion m={1} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> Active orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orderState.allOrders.APPROVED.length > 0 ? (
            <OrderTable columns={approvedColumns} rows={orderState.allOrders.APPROVED} />
          ) : (
            <div>No data</div>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion m={1}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> FullFilled orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orderState.allOrders.COMPLETED.length > 0 ? (
            <OrderTable
              columns={[
                user.role === 'SUPPLIER' ? 'ownerName' : 'supplierName',
                'currency',
                'gross_amount',
                'net_amount',
                'paidAmount',
                'paymentStatus',
                'rateButton',
              ]}
              rows={orderState.allOrders.COMPLETED}
            />
          ) : (
            <div>No data</div>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion m={1}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> Rejected orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orderState.allOrders.REJECTED.length > 0 ? (
            <OrderTable
              columns={[user.role === 'SUPPLIER' ? 'ownerName' : 'supplierName', 'currency', 'gross_amount']}
              rows={orderState.allOrders.REJECTED}
            />
          ) : (
            <div>No data</div>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
