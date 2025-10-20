// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Searchbar } from "../../components/searchbar/searchbar";
import { CityCardList } from "../../components/city-card-list/city-card-list";
import { Statistics } from "../../components/statistics/statistics";
import { WeatherService } from '../../services/weather-service';
import { Location } from '../../models/location';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Searchbar, Statistics, CityCardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  selectedCities: any[] = [];
  isLoadingCities: boolean = false; // Add loading state
  private storageKey = 'weatherio-cities';
  private savedLocations: Location[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadCitiesFromStorage();
  }

  // ✅ Load locations from localStorage and fetch fresh weather data
  private loadCitiesFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.savedLocations = JSON.parse(stored);
        console.log('📦 Loaded locations from localStorage:', this.savedLocations);
        
        if (this.savedLocations.length > 0) {
          this.isLoadingCities = true; // Start loading
          
          // Create an array of observables for all weather requests
          const weatherRequests = this.savedLocations.map(location =>
            this.weatherService.getWeather(location.lat, location.lon).pipe(
              catchError(error => {
                console.error(`Error fetching weather for ${location.name}:`, error);
                return of(null); // Return null on error to continue with other requests
              })
            )
          );

          // Wait for all requests to complete
          forkJoin(weatherRequests).subscribe(
            (weatherDataArray) => {
              weatherDataArray.forEach((weatherData, index) => {
                if (weatherData) {
                  const location = this.savedLocations[index];
                  const cityWithWeather = {
                    ...weatherData,
                    lat: location.lat,
                    lon: location.lon,
                    name: location.name,
                    state: location.state,
                    country: location.country,
                    displayName: location.displayName
                  };
                  this.selectedCities.push(cityWithWeather);
                  console.log('🌦️ Added city with fresh weather:', cityWithWeather);
                }
              });
              this.isLoadingCities = false; // Stop loading when all requests complete
            },
            (error) => {
              console.error('Error loading cities:', error);
              this.isLoadingCities = false; // Stop loading on error
            }
          );
        }
      } catch (e) {
        console.error('Failed to parse locations from storage:', e);
        this.isLoadingCities = false;
      }
    }
  }

  // ✅ Save only location data (no weather) to localStorage
  private saveCitiesToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.savedLocations));
    console.log('💾 Saved locations to localStorage:', this.savedLocations);
  }

  // ✅ Fetch weather and add city to the list
  private fetchAndAddCity(location: Location, shouldSave: boolean = true) {
    this.weatherService.getWeather(location.lat, location.lon).subscribe(
      (weatherData) => {
        if (weatherData) {
          const cityWithWeather = {
            ...weatherData,
            lat: location.lat,
            lon: location.lon,
            name: location.name,
            state: location.state,
            country: location.country,
            displayName: location.displayName
          };
          
          // Only add if not already in the array
          const exists = this.selectedCities.some(
            city => city.lat === location.lat && city.lon === location.lon
          );
          
          if (!exists) {
            this.selectedCities.push(cityWithWeather);
            console.log('🌦️ Added city with fresh weather:', cityWithWeather);
            
            // If this is a new city (not from load), add to savedLocations and save
            if (shouldSave) {
              const locationData: Location = {
                name: location.name,
                state: location.state,
                country: location.country,
                lat: location.lat,
                lon: location.lon,
                displayName: location.displayName
              };
              this.savedLocations.push(locationData);
              this.saveCitiesToStorage();
            }
          }
        }
      },
      (error) => console.error('Error fetching weather data:', error)
    );
  }

  // ✅ Add new city if not already added
  onLocationSelected(location: Location) {
    const alreadyExists = this.selectedCities.some(
      (city) => city.lat === location.lat && city.lon === location.lon
    );

    if (alreadyExists) {
      console.warn(`⚠️ ${location.name} already exists.`);
      return;
    }

    this.fetchAndAddCity(location, true);
  }

  // Add this method to your Dashboard component
onCityDeleted(location: { lat: number, lon: number }) {
  // Remove from selectedCities array
  this.selectedCities = this.selectedCities.filter(
    city => !(city.lat === location.lat && city.lon === location.lon)
  );

  // Remove from savedLocations array
  this.savedLocations = this.savedLocations.filter(
    loc => !(loc.lat === location.lat && loc.lon === location.lon)
  );

  // Update localStorage
  this.saveCitiesToStorage();
  
  console.log('🗑️ Deleted city:', location);
}
}