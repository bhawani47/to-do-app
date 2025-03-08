# Todo App with Weather Integration

A modern, production-ready React Todo application with weather integration, built with Vite, Redux Toolkit, and Material-UI.

![Todo App Screenshot](screenshot.png)

## Features

- **Authentication System**
  - Mock JWT login/logout functionality
  - Protected routes
  - Auth state persistence using localStorage

- **Todo Management**
  - Add/Delete tasks with priority levels
  - Mark tasks as completed
  - Filter tasks by priority
  - LocalStorage synchronization

- **Weather Integration**
  - Real-time weather data using OpenWeatherMap API
  - Location-based weather detection
  - Search for weather by city

- **UI Features**
  - Mobile-first responsive design
  - Loading states & error handling
  - Modern Material-UI components
  - Hamburger menu for mobile devices

## Tech Stack

- **Frontend Framework**: React with Vite
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router 6
- **UI Library**: Material-UI + Emotion CSS
- **API Integration**: Axios + OpenWeatherMap API
- **Form Handling**: Formik with Yup validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your OpenWeatherMap API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get an API key
   - Open `src/features/weather/weatherApi.js` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- Email: user@example.com
- Password: password

## Project Structure

```
src/
├── app/
│   └── store.js                # Redux store configuration
├── components/
│   ├── Auth/                   # Authentication components
│   ├── Layout/                 # Layout components
│   ├── Pages/                  # Page components
│   ├── Todos/                  # Todo components
│   └── Weather/                # Weather components
├── features/
│   ├── auth/                   # Auth slice
│   ├── todos/                  # Todos slice
│   └── weather/                # Weather API slice
├── utils/                      # Utility functions
├── App.jsx                     # Main App component
└── main.jsx                    # Entry point
```

## Performance Optimization

- Memoization with React.memo and useMemo
- Debounced search for weather API
- Lazy loading for API queries
- Optimized re-renders

## Deployment

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
