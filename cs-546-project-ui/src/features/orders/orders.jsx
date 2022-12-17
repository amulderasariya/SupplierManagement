import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderTable from './orderTable';
import OrderDialog from './orderDialog';
import { useSelector } from 'react-redux';

export default function Orders() {
  const [open, setOpen] = React.useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          <OrderTable />
        </AccordionDetails>
      </Accordion>
      <Accordion m={1} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> Active orders</Typography>
        </AccordionSummary>
        <AccordionDetails>Data</AccordionDetails>
      </Accordion>
      <Accordion m={1}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> FullFilled orders</Typography>
        </AccordionSummary>
        <AccordionDetails>Data</AccordionDetails>
      </Accordion>
    </Box>
  );
}
