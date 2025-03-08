import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define priority enum
export const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Load todos from localStorage
const loadTodosFromStorage = () => {
  try {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

// Save todos to localStorage
const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

// Initial state
const initialState = {
  items: loadTodosFromStorage(),
  filter: 'all', // 'all' | 'high' | 'medium' | 'low' | 'important'
  status: 'idle',
  error: null,
  searchTerm: '',
};

// Async thunk for adding a todo with delay (simulating API call)
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create new todo with ID and timestamp
      const newTodo = {
        ...todo,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completed: false,
        important: false,
      };
      
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return todoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Todos slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodoComplete: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(state.items);
      }
    },
    toggleTodoImportant: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.important = !todo.important;
        saveTodosToStorage(state.items);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
    },
    addNotification: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        todo.notification = action.payload.date;
        saveTodosToStorage(state.items);
      }
    },
    removeNotification: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.notification = null;
        saveTodosToStorage(state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Add todo cases
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        saveTodosToStorage(state.items);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete todo cases
      .addCase(deleteTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(todo => todo.id !== action.payload);
        saveTodosToStorage(state.items);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Export actions
export const { 
  toggleTodoComplete, 
  toggleTodoImportant, 
  setFilter, 
  setSearchTerm, 
  clearSearch,
  addNotification,
  removeNotification
} = todosSlice.actions;

// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  const filter = state.todos.filter;
  const searchTerm = state.todos.searchTerm.toLowerCase();
  let todos = state.todos.items;
  
  // Apply search filter
  if (searchTerm) {
    todos = todos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply category filter
  if (filter === 'all') {
    return todos;
  } else if (filter === 'important') {
    return todos.filter(todo => todo.important);
  } else if (filter === 'today') {
    const today = new Date().toDateString();
    return todos.filter(todo => {
      if (todo.notification) {
        const notificationDate = new Date(todo.notification).toDateString();
        return notificationDate === today;
      }
      return false;
    });
  } else {
    return todos.filter(todo => todo.priority === filter);
  }
};
export const selectTodosStatus = (state) => state.todos.status;
export const selectTodosFilter = (state) => state.todos.filter;
export const selectSearchTerm = (state) => state.todos.searchTerm;
export const selectTodosWithNotifications = (state) => 
  state.todos.items.filter(todo => todo.notification);

export default todosSlice.reducer; 