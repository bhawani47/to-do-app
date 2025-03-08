import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Chip,
  Box,
  Tooltip,
  ListItemButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodo, toggleTodoComplete } from '../../features/todos/todosSlice';
import { getPriorityColor, formatDate } from '../../utils/helpers';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  
  const handleToggle = () => {
    dispatch(toggleTodoComplete(todo.id));
  };
  
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };
  
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
      sx={{ mb: 1 }}
    >
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          primary={
            <Box component="span" sx={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary',
              fontWeight: todo.priority === 'high' ? 'bold' : 'normal',
            }}>
              {todo.title}
            </Box>
          }
          secondary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label={todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                size="small"
                sx={{
                  backgroundColor: getPriorityColor(todo.priority),
                  color: 'white',
                  fontWeight: 'bold',
                  height: 20,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
              <Tooltip title={formatDate(todo.createdAt)}>
                <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                  {formatDate(todo.createdAt)}
                </Box>
              </Tooltip>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem; 