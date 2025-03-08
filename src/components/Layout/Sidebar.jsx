import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Button,
  CircularProgress,
  ListItemButton,
  Badge,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TodayIcon from '@mui/icons-material/Today';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTheme } from '../../utils/ThemeContext';
import { selectAllTodos } from '../../features/todos/todosSlice';

const Sidebar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const todos = useSelector(selectAllTodos);
  
  // Count tasks by category
  const pendingTasks = todos.filter(todo => !todo.completed).length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const importantTasks = todos.filter(todo => todo.important && !todo.completed).length;
  
  // Get today's tasks
  const today = new Date().toDateString();
  const todayTasks = todos.filter(todo => {
    if (todo.notification && !todo.completed) {
      const notificationDate = new Date(todo.notification).toDateString();
      return notificationDate === today;
    }
    return false;
  }).length;
  
  // Calculate completion percentage for the progress chart
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Menu items
  const menuItems = [
    { 
      text: 'All Tasks', 
      icon: <CheckCircleOutlineIcon />, 
      path: '/todos',
      count: pendingTasks
    },
    { 
      text: 'Today', 
      icon: <TodayIcon color={location.pathname === '/today' ? 'primary' : 'inherit'} />, 
      path: '/today',
      count: todayTasks
    },
    { 
      text: 'Important', 
      icon: location.pathname === '/important' ? <StarIcon color="warning" /> : <StarBorderIcon />, 
      path: '/important',
      count: importantTasks
    },
    { 
      text: 'Planned', 
      icon: <EventNoteIcon />, 
      path: '/planned',
      count: 0
    },
    { 
      text: 'Assigned to me', 
      icon: <AssignmentIndIcon />, 
      path: '/assigned',
      count: 0
    },
  ];

  return (
    <Box
      sx={{
        width: 250,
        flexShrink: 0,
        bgcolor: theme => isDarkMode ? theme.palette.background.sidebar : theme.palette.background.sidebar,
        borderRight: '1px solid',
        borderColor: theme => theme.palette.divider,
        display: { xs: 'none', sm: 'block' },
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          src="/avatar-placeholder.jpg"
          alt="User Avatar"
          sx={{ width: 80, height: 80, mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Hey, ABCD
        </Typography>
      </Box>

      <List sx={{ px: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              borderLeft: location.pathname === item.path ? '4px solid #4CAF50' : 'none',
              bgcolor: (theme) => 
                location.pathname === item.path 
                  ? (isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)')
                  : 'transparent',
              '&:hover': {
                bgcolor: (theme) => 
                  isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{ pl: location.pathname === item.path ? 2 : 3 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.count > 0 && (
                <Badge 
                  badgeContent={item.count} 
                  color={item.text === 'Important' ? 'warning' : 'primary'}
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ px: 2, mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            borderColor: theme => theme.palette.divider,
            color: theme => theme.palette.text.primary,
          }}
        >
          Add list
        </Button>
      </Box>

      <Box sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Today Tasks
          </Typography>
          <IconButton size="small">
            <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          {todayTasks}
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={completionPercentage}
            size={120}
            thickness={8}
            sx={{
              color: '#4CAF50',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={8}
            sx={{
              color: theme => isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              left: 0,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" component="div" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                {pendingTasks} Pending
              </Typography>
              <Box sx={{ height: 4 }} />
              <Typography variant="caption" component="div" color="primary" sx={{ fontSize: '0.7rem' }}>
                {completedTasks} Done
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar; 