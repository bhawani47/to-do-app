import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  List,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Paper,
} from '@mui/material';
import {
  selectFilteredTodos,
  selectTodosFilter,
  setFilter,
  Priority,
} from '../../features/todos/todosSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectTodosFilter);

  // Sort todos by priority and creation date
  const sortedTodos = useMemo(() => {
    const priorityOrder = { [Priority.HIGH]: 1, [Priority.MEDIUM]: 2, [Priority.LOW]: 3 };
    
    return [...todos].sort((a, b) => {
      // First sort by priority
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [todos]);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          {currentFilter === 'all' ? 'All Tasks' : `${currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} Priority Tasks`}
        </Typography>
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={currentFilter}
            label="Filter"
            onChange={handleFilterChange}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={Priority.HIGH}>High</MenuItem>
            <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={Priority.LOW}>Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {sortedTodos.length > 0 ? (
        <List>
          {sortedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      ) : (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {currentFilter === 'all'
              ? 'No tasks yet. Add a new task to get started!'
              : `No ${currentFilter} priority tasks found.`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TodoList; 