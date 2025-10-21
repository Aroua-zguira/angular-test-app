# Weatherio - Angular Weather Dashboard
 
A modern, responsive weather dashboard application built with Angular 20 that allows users to track weather conditions across multiple cities worldwide.
 
## Features
 
- 🌍 **Multi-City Weather Tracking** - Add and monitor weather for multiple cities simultaneously
- 🔍 **City Search** - Search cities by name with autocomplete suggestions
- 📊 **Weather Statistics** - View average temperature and humidity across all tracked cities
- 💾 **Persistent Storage** - Saved cities are stored locally and restored on page reload
- 📱 **Responsive Design** - Fully responsive interface built with Tailwind CSS
- 🎨 **Detailed Weather Modal** - View comprehensive weather data including:
  - Current temperature and "feels like" temperature
  - Temperature range (min/max)
  - Humidity, pressure, cloudiness, and visibility
  - Wind speed and direction
  - Sunrise and sunset times
- 🌤️ **Weather Icons** - Dynamic weather condition icons based on current weather
- ⚡ **Real-time Updates** - Fresh weather data fetched from OpenWeatherMap API
 
## Prerequisites
 
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.dev/tools/cli) version 20.3.5
 
## Installation
 
1. **Clone the repository**
   ```bash
   git clone https://github.com/Aroua-zguira/angular-test-app.git
   cd angular-test-app
   ```
 
2. **Install dependencies**
   ```bash
   npm install
   ```
 
 
## Development Server
 
To start a local development server, run:
 
```bash
npm start
```
 
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
 
## Project Structure
 
```
src/
├── app/
│   ├── components/
│   │   ├── city-card/           # Individual city weather card
│   │   ├── city-card-list/      # Grid of city cards
│   │   ├── details-modal/       # Detailed weather modal
│   │   ├── header/              # Header component
│   │   ├── searchbar/           # City search component
│   │   └── statistics/          # Weather statistics display
│   ├── pages/
│   │   └── dashboard/           # Main dashboard page
│   ├── services/
│   │   ├── weather-service.ts   # Weather API service
│   │   └── location-service.ts  # Geocoding API service
│   └── models/
│       └── location.ts          # Location data model
│       └── detailedwaether.ts   # detailed weather data model
├── environments/                # Environment configurations
└── assets/                      # Static assets
```
 
 
 
 
 
 
## Technologies Used
 
- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library
- **OpenWeatherMap API** - Weather data provider
- **API Ninjas Geocoding** - Location search and geocoding
 
## Key Features Implementation
 
### Local Storage
Cities are persisted in browser's localStorage using the key `weatherio-cities`. The data structure includes:
- City name, state, and country
- Latitude and longitude coordinates
 
### Weather Data
Real-time weather data is fetched for each city including:
- Temperature (current, min, max, feels like)
- Weather conditions and description
- Atmospheric data (humidity, pressure, visibility, clouds)
- Wind information (speed, direction)
- Sun times (sunrise, sunset)
 
### Statistics Calculation
The dashboard automatically calculates and displays:
- Average temperature across all tracked cities
- Average humidity across all tracked cities
- Total number of tracked cities