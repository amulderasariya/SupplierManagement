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
import { useSelector } from 'react-redux';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { user } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {user.role === 'SUPPLIER' ? row.ownerName : row.supplierName}
        </TableCell>
        <TableCell align="center">{row.currency}</TableCell>
        <TableCell align="center">{row.gross_amount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" fontWeight={800} gutterBottom component="div">
                History
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
                  {column}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
