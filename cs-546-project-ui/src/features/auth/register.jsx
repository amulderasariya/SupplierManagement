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
import { Alert, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerAndFetchUser } from '../../redux/auth.reducer';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../utils/validationUtils';

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      authState.isLoggedIn && navigate('/');
    }, 500);
  }, [authState.isLoggedIn]);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('OWNER');
  const [isPassMismatch, setisPassMismatch] = useState(false);
  const [passwordValdation, setPasswordValdation] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      registerAndFetchUser({
        email: data.get('email'),
        password: data.get('password'),
        repassword: data.get('repassword'),
        role: role,
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {authState.errors.length > 0 && authState.errors.map((error) => <Alert severity="error">{error.msg}</Alert>)}
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            error={Boolean(passwordValdation)}
            helperText={passwordValdation}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordValdation(validatePassword(event.target.value));
            }}
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repassword"
            label="Confirm Password"
            type="password"
            id="comfirm-password"
            onChange={(event) => setisPassMismatch(event.target.value !== password)}
            error={isPassMismatch}
            helperText={isPassMismatch && "Passwords doesn't match"}
          />
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            required
            fullWidth
            labelId="role"
            id="role"
            value={role}
            label="Role"
            onChange={(event) => setRole(event.target.value)}
          >
            <MenuItem value={'SUPPLIER'}>Supplier</MenuItem>
            <MenuItem value={'OWNER'}>Owner</MenuItem>
          </Select>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
        {'Copyright © '}
        <Link color="inherit" href="https://localhost:3000/">
          Supplier Management
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
}
