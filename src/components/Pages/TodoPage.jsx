import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  IconButton,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Grid,
  Menu,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RepeatIcon from '@mui/icons-material/Repeat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '../../utils/ThemeContext';
import { 
  addTodo, 
  deleteTodo, 
  toggleTodoComplete, 
  toggleTodoImportant, 
  setFilter, 
  selectFilteredTodos,
  selectTodosFilter,
  setSearchTerm,
  selectSearchTerm,
  addNotification,
  removeNotification
} from '../../features/todos/todosSlice';

const TodoPage = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectTodosFilter);
  const searchTerm = useSelector(selectSearchTerm);
  const [newTask, setNewTask] = useState('');
  const [notificationDialog, setNotificationDialog] = useState({
    open: false,
    todoId: null
  });
  const [notificationDate, setNotificationDate] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskMenuAnchor, setTaskMenuAnchor] = useState(null);
  
  // Filter completed and pending tasks
  const pendingTasks = todos.filter(todo => !todo.completed);
  const completedTasks = todos.filter(todo => todo.completed);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTodo({ 
        title: newTask, 
        priority: 'medium' 
      }));
      setNewTask('');
      showSnackbar('Task added successfully!', 'success');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      handleAddTask();
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleTodoComplete(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask(null);
    }
    showSnackbar('Task deleted successfully!', 'success');
  };

  const handleToggleStar = (id) => {
    dispatch(toggleTodoImportant(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  const openNotificationDialog = (todoId) => {
    // Set default date and time to now + 1 hour
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Format time as HH:MM with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    setNotificationDate(dateStr);
    setNotificationTime(timeStr);
    
    setNotificationDialog({
      open: true,
      todoId
    });
  };

  const closeNotificationDialog = () => {
    setNotificationDialog({
      open: false,
      todoId: null
    });
  };

  const handleSetNotification = () => {
    if (notificationDialog.todoId && notificationDate && notificationTime) {
      // Combine date and time into a single Date object
      const dateTimeStr = `${notificationDate}T${notificationTime}:00`;
      const dateTime = new Date(dateTimeStr);
      
      dispatch(addNotification({
        todoId: notificationDialog.todoId,
        date: dateTime.toISOString()
      }));
      closeNotificationDialog();
      showSnackbar('Reminder set successfully!', 'success');
    } else {
      showSnackbar('Please select a valid date and time', 'error');
    }
  };

  const handleRemoveNotification = (todoId) => {
    dispatch(removeNotification(todoId));
    showSnackbar('Reminder removed!', 'info');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const handleSelectTask = (todo) => {
    setSelectedTask(todo);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleOpenTaskMenu = (event, todo) => {
    setTaskMenuAnchor(event.currentTarget);
    setSelectedTask(todo);
  };

  const handleCloseTaskMenu = () => {
    setTaskMenuAnchor(null);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 0, 
        overflow: 'auto',
        borderRight: selectedTask ? '1px solid' : 'none',
        borderColor: 'divider',
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
              To Do
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                value={currentFilter}
                onChange={handleFilterChange}
                sx={{ 
                  bgcolor: theme => isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="important">Important</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
                <MenuItem value="medium">Medium Priority</MenuItem>
                <MenuItem value="low">Low Priority</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Add Task Input */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: theme => isDarkMode ? 'rgba(45, 45, 45, 1)' : 'rgba(245, 245, 245, 1)',
        }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Add A Task
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton size="small" sx={{ mr: 1 }}>
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ mr: 1 }}>
              <RepeatIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <CalendarTodayIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Add a task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ mr: 2 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddTask}
              disabled={!newTask.trim()}
              sx={{ 
                borderRadius: 1,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            >
              ADD TASK
            </Button>
          </Box>
        </Box>

        {/* Tasks List */}
        <Box sx={{ p: 0 }}>
          {/* Pending Tasks */}
          <Box>
            {pendingTasks.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                {searchTerm 
                  ? 'No tasks match your search' 
                  : currentFilter !== 'all' 
                    ? `No ${currentFilter} tasks found` 
                    : 'No tasks yet. Add a task to get started!'}
              </Typography>
            )}
            {pendingTasks.map((todo) => (
              <Box 
                key={todo.id}
                onClick={() => handleSelectTask(todo)}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  bgcolor: selectedTask && selectedTask.id === todo.id 
                    ? (isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)')
                    : 'transparent',
                  '&:hover': {
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  }
                }}
              >
                <Checkbox 
                  checked={todo.completed} 
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleComplete(todo.id);
                  }}
                  sx={{ mr: 1 }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    flexGrow: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                  }}
                >
                  {todo.title}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStar(todo.id);
                  }}
                  sx={{ color: todo.important ? 'warning.main' : 'action.disabled' }}
                >
                  {todo.important ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <Box>
              <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 'bold', borderBottom: '1px solid', borderColor: 'divider' }}>
                Completed
              </Typography>
              {completedTasks.map((todo) => (
                <Box 
                  key={todo.id}
                  onClick={() => handleSelectTask(todo)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    bgcolor: selectedTask && selectedTask.id === todo.id 
                      ? (isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)')
                      : 'transparent',
                    '&:hover': {
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    }
                  }}
                >
                  <Checkbox 
                    checked={todo.completed} 
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(todo.id);
                    }}
                    sx={{ mr: 1 }}
                  />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      flexGrow: 1,
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                    }}
                  >
                    {todo.title}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(todo.id);
                    }}
                    sx={{ color: todo.important ? 'warning.main' : 'action.disabled' }}
                  >
                    {todo.important ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Task Detail Panel */}
      {selectedTask && (
        <Box sx={{ 
          width: 300, 
          p: 0, 
          borderLeft: '1px solid',
          borderColor: 'divider',
          display: { xs: 'none', sm: 'block' },
          overflow: 'auto'
        }}>
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {selectedTask.completed ? 'Completed' : 'Buy groceries'}
            </Typography>
            <IconButton size="small" onClick={handleCloseTaskDetail}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<AddIcon />}
                sx={{ justifyContent: 'flex-start', mb: 1 }}
              >
                Add Step
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<NotificationsNoneIcon />}
                sx={{ justifyContent: 'flex-start', mb: 1 }}
                onClick={() => openNotificationDialog(selectedTask.id)}
              >
                Set Reminder
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<CalendarTodayIcon />}
                sx={{ justifyContent: 'flex-start', mb: 1 }}
              >
                Add Due Date
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<RepeatIcon />}
                sx={{ justifyContent: 'flex-start' }}
              >
                Repeat
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Created Today
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Notification Dialog */}
      <Dialog open={notificationDialog.open} onClose={closeNotificationDialog}>
        <DialogTitle>Set Reminder</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, pb: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={notificationDate}
              onChange={(e) => setNotificationDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Time"
              type="time"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNotificationDialog}>Cancel</Button>
          <Button onClick={handleSetNotification} variant="contained" color="primary">
            Set Reminder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TodoPage; 