import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${environment.openWeatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${environment.openWeatherApiKey}&lang={en}&units=metric`;

    return this.http.get(url).pipe(
      map((data: any) => ({
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        wind: data.wind.speed,
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        feelsLike: Math.round(data.main.feels_like),
        windDirection: data.wind.deg,
        clouds: data.clouds.all,
        visibility: data.visibility,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        date: new Date().toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        })
      })),
      catchError(err => {
        console.error('Weather API error:', err);
        return of(null);
      })
    );
  }
}
