import { createTheme } from '@mui/material/styles';

// Create theme options for light and dark modes
const getThemeOptions = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          primary: {
            main: '#4CAF50', // Green color for DoIt logo
            light: '#81C784',
            dark: '#388E3C',
            contrastText: '#fff',
          },
          secondary: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
            contrastText: '#fff',
          },
          background: {
            default: '#f5f5f5', // Light gray background
            paper: '#ffffff',
            sidebar: '#f0f7f0', // Light green sidebar
          },
          text: {
            primary: '#333333',
            secondary: '#666666',
          },
          divider: '#e0e0e0',
        }
      : {
          // Dark mode colors
          primary: {
            main: '#4CAF50', // Green color for DoIt logo
            light: '#81C784',
            dark: '#388E3C',
            contrastText: '#fff',
          },
          secondary: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
            contrastText: '#fff',
          },
          background: {
            default: '#1e1e1e', // Dark background
            paper: '#2d2d2d', // Slightly lighter dark for cards
            sidebar: '#252525', // Dark sidebar
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
          },
          divider: '#3d3d3d',
        }),
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
          color: mode === 'dark' ? '#ffffff' : '#333333',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(76, 175, 80, 0.25)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#4CAF50',
          '&.Mui-checked': {
            color: '#4CAF50',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          marginBottom: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#4CAF50',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#252525' : '#f0f7f0',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Create a theme instance with light mode as default
const lightTheme = createTheme(getThemeOptions('light'));
const darkTheme = createTheme(getThemeOptions('dark'));

export { lightTheme, darkTheme }; 