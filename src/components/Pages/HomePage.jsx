import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '../../utils/ThemeContext';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          mb: 4,
          borderRadius: 2,
          textAlign: 'center',
          bgcolor: theme => isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
          color: 'text.primary',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <TaskAltIcon sx={{ fontSize: 60, color: '#4CAF50' }} />
        </Box>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to DoIt
        </Typography>
        <Typography variant="h6" paragraph>
          The simple and effective way to manage your tasks
        </Typography>
        <Box sx={{ mt: 4 }}>
          {isAuthenticated ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/todos')}
              sx={{ px: 4, py: 1.5 }}
            >
              Go to My Tasks
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/login')}
              sx={{ px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Why Choose DoIt?
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            height: '100%', 
            borderRadius: 2,
            bgcolor: theme => isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
            boxShadow: theme => isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                Simple & Intuitive
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clean interface designed for productivity. No distractions, just tasks.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                onClick={() => navigate('/todos')}
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                Try it now
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            height: '100%', 
            borderRadius: 2,
            bgcolor: theme => isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
            boxShadow: theme => isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                Stay Organized
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categorize tasks, set priorities, and never miss a deadline again.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                onClick={() => navigate('/todos')}
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                Get organized
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            height: '100%', 
            borderRadius: 2,
            bgcolor: theme => isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
            boxShadow: theme => isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                Dark & Light Themes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Work comfortably day or night with our customizable themes.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                onClick={() => navigate('/todos')}
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                See themes
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage; 