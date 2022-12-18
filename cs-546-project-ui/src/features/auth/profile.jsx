import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Autocomplete, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postUserInfo, registerAndFetchUser } from '../../redux/auth.reducer';
import { useNavigate } from 'react-router-dom';
import { city, country, state } from '../../redux/lookup.reducer';
import { get } from 'lodash';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const lookupState = useSelector((state) => state.lookups);

  const [countryF, setCountry] = useState(authState.user.country);
  const [cityF, setCity] = useState(authState.user.city);
  const [stateF, setState] = useState(authState.user.state);
  const [organization, setorganization] = useState(authState.user.organization);

  useEffect(() => {
    dispatch(country());
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      postUserInfo({
        organization,
        city: cityF && cityF.label,
        state: stateF && stateF.id,
        country: countryF && countryF.id,
      })
    );
  };
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box autocomplete="off" component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {authState.errors.length > 0 && authState.errors.map((error) => <Alert severity="error">{error.msg}</Alert>)}
          <TextField
            margin="normal"
            onChange={(event) => setorganization(event.target.value)}
            required
            fullWidth
            id="name"
            label="Organization Name"
            name="organization"
            autoFocus
            value={organization}
          />
          <Box marginBottom={1}>
            <Autocomplete
              options={get(lookupState, 'country', []).map((country) => ({
                ...country,
                id: country.isoCode,
                label: country.name,
              }))}
              fullWidth
              required
              id="country"
              value={countryF}
              onChange={(e, newVal) => {
                setCountry(newVal);
                dispatch(state({ params: { country: newVal.isoCode } }));
              }}
              renderInput={(params) => <TextField {...params} label="Country" />}
            />
          </Box>
          <Box marginBottom={1}>
            <Autocomplete
              options={get(lookupState, 'state', []).map((state) => ({
                ...state,
                id: state.isoCode,
                label: state.name,
              }))}
              fullWidth
              required
              id="state"
              value={stateF}
              onChange={(e, newVal) => {
                setState(newVal);
                dispatch(city({ params: { state: newVal.isoCode, country: countryF.id } }));
              }}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
          </Box>

          <Autocomplete
            options={get(lookupState, 'city', []).map((city) => ({
              ...city,
              id: city.isoCode,
              label: city.name,
            }))}
            fullWidth
            required
            id="city"
            value={cityF}
            onChange={(e, newVal) => setCity(newVal)}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
