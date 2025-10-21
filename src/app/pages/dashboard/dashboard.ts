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
  isLoadingCities: boolean = false; 
  private storageKey = 'weatherio-cities';
  private savedLocations: Location[] = [];
  cityNumber: number = 0;
  avgTemperature: number = 0;
  avgHumidity: number = 0;
  
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadCitiesFromStorage();
  }

  private calculateStatistics() {
    if (this.selectedCities.length === 0) {
      this.avgTemperature = 0;
      this.avgHumidity = 0;
      return;
    }

    const totalTemp = this.selectedCities.reduce((sum, city) => sum + city.temperature, 0);
    const totalHumidity = this.selectedCities.reduce((sum, city) => sum + city.humidity, 0);

    this.avgTemperature = Math.round(totalTemp / this.selectedCities.length);
    this.avgHumidity = Math.round(totalHumidity / this.selectedCities.length);

    console.log('📊 Statistics updated:', {
      avgTemperature: this.avgTemperature,
      avgHumidity: this.avgHumidity,
      cityCount: this.selectedCities.length
    });
  }

  private loadCitiesFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.savedLocations = JSON.parse(stored);
        this.cityNumber = this.savedLocations.length;
        console.log('📦 Loaded locations from localStorage:', this.savedLocations);
        
        if (this.savedLocations.length > 0) {
          this.isLoadingCities = true; 
          
          const weatherRequests = this.savedLocations.map(location =>
            this.weatherService.getWeather(location.lat, location.lon).pipe(
              catchError(error => {
                console.error(`Error fetching weather for ${location.name}:`, error);
                return of(null); 
              })
            )
          );

          forkJoin(weatherRequests).subscribe(
            (weatherDataArray) => {
              weatherDataArray.forEach((weatherData, index) => {
                if (weatherData) {
                  console.log('this is the weather data', weatherData);
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
              this.calculateStatistics();
              this.isLoadingCities = false; 
            },
            (error) => {
              console.error('Error loading cities:', error);
              this.isLoadingCities = false; 
            }
          );
        }
      } catch (e) {
        console.error('Failed to parse locations from storage:', e);
        this.isLoadingCities = false;
      }
    }
  }

  private saveCitiesToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.savedLocations));
    console.log('💾 Saved locations to localStorage:', this.savedLocations);
  }

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
          
          const exists = this.selectedCities.some(
            city => city.lat === location.lat && city.lon === location.lon
          );
          
          if (!exists) {
            this.selectedCities.push(cityWithWeather);
            this.cityNumber++;
            console.log('🌦️ Added city with fresh weather:', cityWithWeather);
            
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
            
            this.calculateStatistics();
          }
        }
      },
      (error) => console.error('Error fetching weather data:', error)
    );
  }

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

  onCityDeleted(location: { lat: number, lon: number }) {
    this.selectedCities = this.selectedCities.filter(
      city => !(city.lat === location.lat && city.lon === location.lon)
    );

    this.savedLocations = this.savedLocations.filter(
      loc => !(loc.lat === location.lat && loc.lon === location.lon)
    );
    this.cityNumber--;

    this.saveCitiesToStorage();
    this.calculateStatistics();
    
    console.log('🗑️ Deleted city:', location);
  }
}