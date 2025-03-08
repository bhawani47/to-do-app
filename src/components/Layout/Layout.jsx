import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../utils/ThemeContext';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          <Header />
          <Container
            maxWidth={false}
            disableGutters
            sx={{
              flexGrow: 1,
              p: 0,
              bgcolor: (theme) => theme.palette.background.default,
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout; 