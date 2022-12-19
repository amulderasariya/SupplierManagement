import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Rating, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { approveOrders, completeOrders, rateOrder, rejectedOrders } from '../../redux/order.reducer';

const columnNameMapping = {
  currency: 'Currency',
  due_date: 'Due Date',
  gross_amount: 'Gross Amount',
  net_amount: 'Net Amount',
  ownerName: 'Owner Name',
  paidAmount: 'Paid Amount',
  paymentStatus: 'Payment Status',
  supplierName: 'Suppier Name',
  deliveredDate: 'Delivered Date',
  pendingAmountPaid: 'Add Paid Amount',
  pendingNetAmount: 'Add Net Amount',
  pendingDueDate: 'Add Due Date',
  approveButton: 'Approve/Reject',
  completeButton: 'Mark Completed',
};
function Row(props) {
  const { row, columns } = props;
  const [open, setOpen] = React.useState(false);
  const [ratings, setRatings] = useState([]);
  const [pendingAmountPaid, setpendingAmountPaid] = useState({});
  const [pendingNetAmount, setpendingNetAmount] = useState({});

  const [completedDelDate, setcompletedDelDate] = useState({});

  const [pendingDueDate, setpendingDueDate] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell align="center" component="th" scope="row">
          {user.role === 'SUPPLIER' ? row.ownerName : row.supplierName}
        </TableCell>
        <TableCell align="center">{row.currency}</TableCell> */}
        {columns.map((column) => {
          switch (column) {
            case 'pendingAmountPaid':
              return (
                <TableCell align="center">
                  <TextField
                    value={pendingAmountPaid[row._id]}
                    InputLabelProps={{ shrink: !isNaN(pendingAmountPaid[row._id]) }}
                    onChange={(event) => {
                      pendingAmountPaid[row._id] = event.target.value;
                      setpendingAmountPaid({ ...pendingAmountPaid });
                    }}
                    fullWidth
                    type="number"
                    id="amountPaid"
                    label="Amount Paid"
                    name="Amount Paid"
                  />
                </TableCell>
              );
            case 'pendingDueDate':
              return (
                <TableCell align="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Due Date"
                      value={pendingDueDate[row._id] === undefined ? null : pendingDueDate[row._id]}
                      onChange={(newValue) => {
                        pendingDueDate[row._id] = newValue;
                        setpendingDueDate({ ...pendingDueDate });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
              );
            case 'pendingNetAmount':
              return (
                <TableCell align="center">
                  <TextField
                    value={pendingNetAmount[row._id]}
                    InputLabelProps={{ shrink: !isNaN(pendingNetAmount[row._id]) }}
                    onChange={(event) => {
                      pendingNetAmount[row._id] = event.target.value;
                      setpendingNetAmount({ ...pendingNetAmount });
                    }}
                    fullWidth
                    type="number"
                    id="amountPaid"
                    label="Amount Paid"
                    name="Amount Paid"
                  />
                </TableCell>
              );
            case 'approveButton':
              return (
                <TableCell align="center">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {
                      dispatch(
                        approveOrders({
                          newURL: `invoice/${row._id}/approve`,
                          due_date: pendingDueDate[row._id] && pendingDueDate[row._id].format(),
                          paidAmount: pendingAmountPaid[row._id],
                          net_amount: pendingNetAmount[row._id],
                        })
                      );
                    }}
                    color="inherit"
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {
                      console.log(pendingDueDate[row._id]);
                      dispatch(
                        rejectedOrders({
                          newURL: `invoice/${row._id}/reject`,
                        })
                      );
                    }}
                    color="inherit"
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              );
            case 'deliveredDate':
              return (
                <TableCell align="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Delivered Date"
                      value={completedDelDate[row._id] === undefined ? null : completedDelDate[row._id]}
                      onChange={(newValue) => {
                        completedDelDate[row._id] = newValue;
                        setpendingDueDate({ ...completedDelDate });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
              );
            case 'completeButton':
              if (user.role === 'OWNER') {
                return (
                  <TableCell align="center">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => {
                        console.log(pendingDueDate[row._id]);
                        dispatch(
                          completeOrders({
                            newURL: `invoice/${row._id}/complete`,
                            deliveredDate: completedDelDate[row._id] && completedDelDate[row._id].format(),
                          })
                        );
                      }}
                      color="inherit"
                    >
                      <DoneIcon />
                    </IconButton>
                  </TableCell>
                );
              }
              break;
            case 'rateButton':
              return (
                <TableCell align="center">
                  <Rating
                    name="simple-controlled"
                    value={user.role === 'SUPPLIER' ? row.ownerRating : row.supplierRating}
                    onChange={(event, newValue) => {
                      ratings[row._id] = newValue;
                      setRatings({...ratings});
                      dispatch(
                        rateOrder({
                          newURL: `invoice/${row._id}/rating`,
                          rating: newValue,
                          review: '',
                        })
                      );
                    }}
                  />
                </TableCell>
              );

            default:
              return <TableCell align="center">{row[column]}</TableCell>;
          }
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" fontWeight={800} gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight={700}>
                        Product Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight={700}>
                        Price in {row.currency}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight={700}>
                        Quantity
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.invoiceProducts.map((product) => (
                    <TableRow key={product.productID}>
                      <TableCell align="center" component="th" scope="row">
                        {product.productName}
                      </TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function OrderTable(props) {
  const { columns, rows = [] } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center" />
            {columns.map((column) => (
              <TableCell align="center">
                <Typography variant="h6" fontWeight={800}>
                  {columnNameMapping[column]}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row._id} row={row} columns={columns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
