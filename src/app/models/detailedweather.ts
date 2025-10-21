export interface DetailedWeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  description: string;
  humidity: number;
  pressure: number;
  wind: number;
  windDirection: number;
  clouds: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  timezone: number;
  lat: number;
  lon: number;
}