import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Location {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  private apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeatherMap API key
  private baseUrl = 'https://api.openweathermap.org/geo/1.0';

  constructor(private http: HttpClient) {}

  /**
   * Search for locations by query string
   */
  searchLocations(query: string, limit: number = 5): Observable<Location[]> {
    const url = `${this.baseUrl}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${this.apiKey}`;
    return this.http.get<Location[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching locations:', error);
        return of([]);
      })
    );
  }

  /**
   * Get location name from coordinates (reverse geocoding)
   */
  getLocationByCoordinates(lat: number, lon: number): Observable<Location | null> {
    const url = `${this.baseUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;
    return this.http.get<Location[]>(url).pipe(
      map(results => results.length > 0 ? results[0] : null),
      catchError(error => {
        console.error('Error fetching location by coordinates:', error);
        return of(null);
      })
    );
  }

  /**
   * Get user's current location using browser Geolocation API
   */
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }

  /**
   * Get current location and reverse geocode it
   */
  async getCurrentLocationInfo(): Promise<Location | null> {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      return await this.getLocationByCoordinates(latitude, longitude).toPromise() || null;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }
}