import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import todosReducer from '../features/todos/todosSlice';
import { weatherApi } from '../features/weather/weatherApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch); 