import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth.reducer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Drawer from './drawer';
import { useNavigate } from 'react-router-dom';

// const settings = ['Profile', 'theme', 'Logout'];

function AppHeader(props) {
  const settings = [
    { title: 'Profile', icon: <AccountCircleIcon />, id: 'PROFILE' },
    {
      title: props.theme !== 'Light' ? 'Light' : 'Dark',
      id: 'THEME',
      icon: props.theme !== 'Light' ? <LightModeIcon /> : <DarkModeIcon />,
    },
    {
      title: 'Logout',
      id: 'LOGOUT',
      icon: <LogoutIcon />,
    },
  ];
  const [anchorElNav, setAnchorElNav] = useState(undefined);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const pages = [];
  pages.push({ title: 'Dashboard' });
  pages.push({ title: 'Products' });
  pages.push({ title: authState.user.role === 'SUPPLIER' ? 'Owners' : 'Suppliers' });

  pages.push({ title: 'Orders' });
  const handleOpenNavMenu = () => {
    setAnchorElNav('left');
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => () => {
    setAnchorElNav(undefined);
    switch (value) {
      case 'Products':
        navigate('/product');
        break;
      case 'Dashboard':
        navigate('/');
        break;
      case 'Orders':
        navigate('/orders');
        break;
      case 'Owners':
      case 'Suppliers':
        navigate('/users');
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (value) => () => {
    switch (value) {
      case 'THEME':
        props.setTheme(props.theme === 'Light' ? 'Dark' : 'Light');
        break;
      case 'LOGOUT':
        dispatch(logout());
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ margin: '1vw', borderRadius: 10, width: '98vw' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              pages={pages}
              settings={settings}
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          </Box>
          <QueryStatsIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Supplier Management
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.title} onClick={handleCloseNavMenu(page.title)} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon color="secondary" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu(setting.id)}>
                  {setting.icon}
                  <Typography padding={1} textAlign="center">
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;
