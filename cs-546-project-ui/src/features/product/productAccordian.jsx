import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ProductCreateDialog from './productCreateEdit';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors } from '../../redux/product.reducer';

export default function ProductAccordion(props) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(props.product.name === 'Create a Product');
  const authState = useSelector((state) => state.auth);

  const onClose = () => {
    setExpanded(false);
    dispatch(setErrors([]));
    props.onClose();
  };

  const onOpen = () => {
    if (authState.user.role === 'OWNER') return;
    setExpanded(true);
    dispatch(setErrors([]));
  };

  return (
    <div>
      <Accordion expanded={expanded}>
        <AccordionSummary
          onClick={() => (expanded ? onClose() : onOpen())}
          expandIcon={authState.user.role === 'OWNER' ? <div></div> : <EditIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container flex="true" justifyContent="space-between" m={1}>
            <Grid item flex={2}>
              <Typography>{props.product.name}</Typography>
            </Grid>
            <Grid item flex={2}>
              <Typography>{props.product.department}</Typography>
            </Grid>
            <Grid item flex={2}>
              <Typography>{props.product.category}</Typography>
            </Grid>
            <Grid item flex={2}>
              <Typography>{props.product.subCategory}</Typography>
            </Grid>
            <Grid item flex={1}>
              <Typography>{props.product.stock}</Typography>
            </Grid>
            <Grid item flex={1}>
              <Typography>{`${props.product.currency} ${props.product.price}`}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <ProductCreateDialog onClose={onClose} product={props.product} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
