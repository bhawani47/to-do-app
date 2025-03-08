import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { 
  useGetWeatherByCityQuery, 
  useLazyGetWeatherByCityQuery,
  useLazyGetWeatherByCoordsQuery
} from '../../features/weather/weatherApi';
import { getCurrentLocation } from '../../utils/helpers';
import { debounce } from '../../utils/helpers';

const WeatherWidget = () => {
  const [city, setCity] = useState('London');
  const [searchTerm, setSearchTerm] = useState('');
  
  // RTK Query hooks
  const { data: weatherData, error, isLoading } = useGetWeatherByCityQuery(city);
  const [getWeatherByCity, { isLoading: isSearchLoading }] = useLazyGetWeatherByCityQuery();
  const [getWeatherByCoords, { isLoading: isLocationLoading }] = useLazyGetWeatherByCoordsQuery();
  
  // Handle search input change with debounce
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 500);
  
  const handleInputChange = (e) => {
    debouncedSearch(e.target.value);
  };
  
  // Handle search submission
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const result = await getWeatherByCity(searchTerm).unwrap();
        setCity(searchTerm);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Get weather by user's location
  const handleGetLocationWeather = async () => {
    try {
      const coords = await getCurrentLocation();
      const result = await getWeatherByCoords(coords).unwrap();
      setCity(result.city);
      setSearchTerm(result.city);
    } catch (error) {
      console.error('Failed to get location weather:', error);
    }
  };
  
  // Initialize with user's location on component mount
  useEffect(() => {
    handleGetLocationWeather();
  }, []);
  
  // Render loading state
  if (isLoading || isSearchLoading || isLocationLoading) {
    return (
      <Card sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search city..."
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              value={searchTerm}
              disabled={isLoading || isSearchLoading || isLocationLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch} disabled={isLoading || isSearchLoading || isLocationLoading}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleGetLocationWeather} disabled={isLoading || isSearchLoading || isLocationLoading}>
                      <LocationOnIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
          
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <Card sx={{ borderRadius: 2, mb: 4, bgcolor: '#ffebee' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search city..."
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              value={searchTerm}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleGetLocationWeather}>
                      <LocationOnIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>
          
          <Typography color="error" variant="body1" align="center" sx={{ my: 2 }}>
            {error.status === 404
              ? 'City not found. Please try another location.'
              : 'Failed to load weather data. Please try again.'}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  // Render weather data
  return (
    <Card sx={{ borderRadius: 2, mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search city..."
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={searchTerm}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                  <IconButton onClick={handleGetLocationWeather}>
                    <LocationOnIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Box>
        
        {weatherData && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {weatherData.city}, {weatherData.country}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              {weatherData.icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                  width={50}
                  height={50}
                />
              )}
              <Typography variant="h4" component="span">
                {Math.round(weatherData.temperature)}°C
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Humidity
                </Typography>
                <Typography variant="body1">
                  {weatherData.humidity}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Wind
                </Typography>
                <Typography variant="body1">
                  {weatherData.windSpeed} m/s
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget; 