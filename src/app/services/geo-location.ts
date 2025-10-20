import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';
import { Location } from '../models/location';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  
  constructor(private http: HttpClient) {}

  /**
   * Search for locations by query string with autocomplete
   */
  searchLocations(query: string, limit: number = 5): Observable<Location[]> {
    if (!query || query.trim().length < 2) {
      return of([]);
    }

    // Nominatim requires a User-Agent header
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    const url = `${environment.nominatimBaseUrl}/search?` +
      `q=${encodeURIComponent(query.trim())}&` +
      `format=json&` +
      `limit=${limit}&` +
      `addressdetails=1&` +
      `featuretype=city`;
    
    return this.http.get<any[]>(url, { headers }).pipe(
      // Add small delay to respect rate limits (max 1 request per second)
      delay(100),
      map(results => {
        return results
          .filter(r => r.type === 'city' || r.type === 'town' || r.type === 'village' || 
                       r.type === 'administrative' || r.class === 'place')
          .map(result => this.parseNominatimResult(result));
      }),
      catchError(error => {
        console.error('Error fetching locations:', error);
        return of([]);
      })
    );
  }

  /**
   * Parse Nominatim result to Location interface
   */
  private parseNominatimResult(result: any): Location {
    const address = result.address || {};
    const name = address.city || address.town || address.village || 
                 address.municipality || result.name || 'Unknown';
    const state = address.state || address.province || '';
    const country = address.country || '';
    
    return {
      name: name,
      state: state,
      country: country,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      
    };
  }

  

 

  
  
}