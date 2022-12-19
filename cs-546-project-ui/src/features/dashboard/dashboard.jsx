import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import LineChart from './lineChart';
import { groupBy, sales } from '../../redux/dashboard.reducer';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { BarChart } from './barChart';

export default function Dashboard() {
  const dashboardState = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const [endDate, setEndDate] = useState(dayjs(today));

  today.setFullYear(today.getFullYear() - 1);

  const [startDate, setStartDate] = useState(dayjs(today));
  const [groupByF, setGroupBy] = useState('department');
  const handleSubmit = () => {
    if (startDate.diff(endDate) > 0) {
      alert('Start Date cannot be less than end date');
      return;
    }
    dispatch(sales({ params: { startDate: startDate.format(), endDate: endDate.format() } }));
    dispatch(groupBy({ params: { startDate: startDate.format(), endDate: endDate.format(), groupBy: groupByF } }));
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <Box margin={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid display="flex" justifyContent="space-between">
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Select
            value={groupByF}
            label="Group By"
            onChange={(e) => {
              setGroupBy(e.target.value);
            }}
          >
            <MenuItem value={'department'}>Department</MenuItem>
            <MenuItem value={'category'}>Category</MenuItem>
            <MenuItem value={'subCategory'}>Sub Category</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleSubmit}>
            Filter
          </Button>
        </Grid>
      </LocalizationProvider>
      <Grid display="flex">
        <Grid width="50vw" height="50vh" margin={3}>
          <LineChart data={dashboardState.salesGraph} />
        </Grid>
        <Grid width="50vw" height="50vh">
          <BarChart data={dashboardState.groupBy} />
        </Grid>
      </Grid>
    </Box>
  );
}
