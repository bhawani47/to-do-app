import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './utils/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/HomePage';
import TodoPage from './components/Pages/TodoPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import LoginForm from './components/Auth/LoginForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/todos" element={<TodoPage />} />
                <Route path="/today" element={<TodoPage />} />
                <Route path="/important" element={<TodoPage />} />
                <Route path="/planned" element={<TodoPage />} />
                <Route path="/assigned" element={<TodoPage />} />
                <Route path="/calendar" element={<TodoPage />} />
                <Route path="/notes" element={<TodoPage />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
