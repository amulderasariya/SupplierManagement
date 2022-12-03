import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Drawer(props) {
  const { anchorElNav, handleCloseNavMenu, handleCloseUserMenu } = props;
  return (
    <SwipeableDrawer
      onOpen={() => {}}
      anchor={anchorElNav}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu(null)}
    >
      <Box sx={{ width: 250 }} role="presentation" onKeyDown={handleCloseNavMenu}>
        <List>
          {props.pages.map((page, index) => (
            <ListItem key={page.title} disablePadding onClick={handleCloseNavMenu(page.title)}>
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {props.settings.map((setting, index) => (
            <ListItem key={setting.title} disablePadding onClick={handleCloseUserMenu(setting.id)}>
              <ListItemButton>
                <ListItemIcon>{setting.icon}</ListItemIcon>
                <ListItemText primary={setting.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
