import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { addTodo, selectTodosStatus } from '../../features/todos/todosSlice';
import { Priority } from '../../features/todos/todosSlice';

const TodoInput = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectTodosStatus);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(Priority.MEDIUM);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim()) {
      dispatch(addTodo({ title, priority }));
      setTitle('');
    }
  };

  const handleKeyPress = (e) => {
    // Submit on Enter key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'flex-start' },
        gap: 2,
        mb: 4,
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        label="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={status === 'loading'}
        sx={{ flexGrow: 1 }}
      />
      
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          id="priority"
          value={priority}
          label="Priority"
          onChange={(e) => setPriority(e.target.value)}
          disabled={status === 'loading'}
        >
          <MenuItem value={Priority.HIGH}>High</MenuItem>
          <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
          <MenuItem value={Priority.LOW}>Low</MenuItem>
        </Select>
      </FormControl>
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!title.trim() || status === 'loading'}
        sx={{ 
          height: { sm: 56 },
          minWidth: { xs: '100%', sm: 120 }
        }}
      >
        {status === 'loading' ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Add Task'
        )}
      </Button>
    </Box>
  );
};

export default TodoInput; 