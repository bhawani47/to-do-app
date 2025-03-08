import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// OpenWeatherMap API key - in a real app, this would be in an environment variable
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `weather?q=${city}&units=metric&appid=${API_KEY}`,
      transformResponse: (response) => {
        return {
          city: response.name,
          country: response.sys.country,
          temperature: response.main.temp,
          description: response.weather[0].description,
          icon: response.weather[0].icon,
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          timestamp: new Date().toISOString(),
        };
      },
      // Cache for 30 minutes
      keepUnusedDataFor: 1800,
    }),
    getWeatherByCoords: builder.query({
      query: ({ lat, lon }) => `weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      transformResponse: (response) => {
        return {
          city: response.name,
          country: response.sys.country,
          temperature: response.main.temp,
          description: response.weather[0].description,
          icon: response.weather[0].icon,
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          timestamp: new Date().toISOString(),
        };
      },
      // Cache for 30 minutes
      keepUnusedDataFor: 1800,
    }),
  }),
});

// Export hooks for usage in components
export const { 
  useGetWeatherByCityQuery, 
  useGetWeatherByCoordsQuery,
  useLazyGetWeatherByCityQuery,
  useLazyGetWeatherByCoordsQuery
} = weatherApi; 