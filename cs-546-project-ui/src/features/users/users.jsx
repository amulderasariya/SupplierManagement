import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getOwners, getSuppliers } from '../../redux/auth.reducer';
import { Grid, TextField } from '@mui/material';

const columns = [
  { field: 'organization', headerName: 'Organization Name', width: 400 },
  { field: 'rating', headerName: 'Rating', width: 400 },

  { field: 'city', headerName: 'City', width: 400 },
  { field: 'state', headerName: 'State', width: 100 },
  { field: 'country', headerName: 'Country', width: 100 },
];

export default function Users() {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user.role === 'SUPPLIER') dispatch(getOwners());
    else dispatch(getSuppliers());
  }, []);
  useEffect(() => {
    setRows(authState.user.role === 'SUPPLIER' ? authState.owners : authState.suppliers);
  }, [authState.owners, authState.suppliers]);
  const [search, setSearch] = useState();
  const [rows, setRows] = useState([]);
  return (
    <Grid height="70vh">
      <Grid flexGrow={1} item margin={2}>
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            const userData = authState.user.role === 'SUPPLIER' ? authState.owners : authState.suppliers;
            if (e.target.value) {
              const filteredData = userData.filter((row) => {
                return Object.keys(row).find((ele) => {
                  return JSON.stringify(row[ele]).toLowerCase().includes(e.target.value.toLowerCase());
                });
              });
              setRows([...filteredData]);
            } else {
              setRows([...userData]);
            }
          }}
          margin="normal"
          fullWidth
          id="search"
          label="Search User"
          name="search"
          autoFocus
        />
      </Grid>
      <DataGrid
        rows={rows.map((row) => ({ ...row, id: row._id, rating: row.rating || 0 }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Grid>
  );
}
