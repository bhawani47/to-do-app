import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  InputBase,
  Tooltip,
  ListItemButton,
  Badge,
  Popover,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppsIcon from '@mui/icons-material/Apps';
import GridViewIcon from '@mui/icons-material/GridView';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TodayIcon from '@mui/icons-material/Today';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '../../utils/ThemeContext';
import { logout } from '../../features/auth/authSlice';
import { 
  setSearchTerm, 
  selectSearchTerm, 
  selectTodosWithNotifications,
  toggleTodoComplete
} from '../../features/todos/todosSlice';
import { formatDate } from '../../utils/helpers';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [appsMenuAnchor, setAppsMenuAnchor] = useState(null);
  const searchTerm = useSelector(selectSearchTerm);
  const todosWithNotifications = useSelector(selectTodosWithNotifications);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleAppsMenuOpen = (event) => {
    setAppsMenuAnchor(event.currentTarget);
  };

  const handleAppsMenuClose = () => {
    setAppsMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleUserMenuClose();
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  const handleCompleteNotification = (todoId) => {
    dispatch(toggleTodoComplete(todoId));
    handleNotificationsClose();
  };

  const handleNavigateToTodos = () => {
    navigate('/todos');
    handleNotificationsClose();
  };

  // Check for due notifications
  const dueNotifications = todosWithNotifications.filter(todo => {
    if (todo.notification) {
      const notificationTime = new Date(todo.notification).getTime();
      const now = new Date().getTime();
      return notificationTime <= now && !todo.completed;
    }
    return false;
  });

  // Menu items for mobile drawer
  const menuItems = [
    { text: 'All Tasks', icon: <CheckCircleOutlineIcon />, path: '/todos' },
    { text: 'Today', icon: <TodayIcon color="primary" />, path: '/today' },
    { text: 'Important', icon: <StarBorderIcon />, path: '/important' },
    { text: 'Planned', icon: <EventNoteIcon />, path: '/planned' },
    { text: 'Assigned to me', icon: <AssignmentIndIcon />, path: '/assigned' },
  ];

  // Apps menu items
  const appItems = [
    { name: 'Tasks', icon: <CheckCircleOutlineIcon />, path: '/todos' },
    { name: 'Calendar', icon: <EventNoteIcon />, path: '/calendar' },
    { name: 'Notes', icon: <AssignmentIndIcon />, path: '/notes' },
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DoIt
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        color="inherit" 
        elevation={0}
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: theme => theme.palette.background.default,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#4CAF50',
              fontWeight: 'bold',
              mr: 2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <Box 
              component="span" 
              sx={{ 
                color: '#4CAF50', 
                fontSize: '1.5rem', 
                mr: 0.5,
                display: { xs: 'none', sm: 'inline' }
              }}
            >
              DoIt
            </Box>
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex' }}>
            <Tooltip title="Search">
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle theme">
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Apps">
              <IconButton 
                color="inherit"
                onClick={handleAppsMenuOpen}
                aria-controls="apps-menu"
                aria-haspopup="true"
              >
                <GridViewIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit"
                onClick={handleNotificationsOpen}
                aria-controls="notifications-menu"
                aria-haspopup="true"
              >
                <Badge badgeContent={dueNotifications.length} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account">
              <IconButton
                color="inherit"
                onClick={handleUserMenuOpen}
                aria-controls="user-menu"
                aria-haspopup="true"
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* User menu */}
      <Menu
        id="user-menu"
        anchorEl={userMenuAnchor}
        keepMounted
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      {/* Notifications popover */}
      <Popover
        id="notifications-menu"
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 320, maxHeight: 400, overflow: 'auto', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
          
          {dueNotifications.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              No notifications
            </Typography>
          ) : (
            dueNotifications.map(todo => (
              <Card key={todo.id} sx={{ mb: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="subtitle1">{todo.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Due: {formatDate(todo.notification)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleCompleteNotification(todo.id)}>
                    Mark as Done
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
          
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={handleNavigateToTodos}
            sx={{ mt: 1 }}
          >
            View All Tasks
          </Button>
        </Box>
      </Popover>
      
      {/* Apps menu */}
      <Popover
        id="apps-menu"
        anchorEl={appsMenuAnchor}
        open={Boolean(appsMenuAnchor)}
        onClose={handleAppsMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Apps</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {appItems.map(app => (
              <Box 
                key={app.name}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme => isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
                onClick={() => {
                  navigate(app.path);
                  handleAppsMenuClose();
                }}
              >
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  bgcolor: theme => isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                  color: '#4CAF50',
                  mb: 1
                }}>
                  {app.icon}
                </Box>
                <Typography variant="body2">{app.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Popover>
      
      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header; 