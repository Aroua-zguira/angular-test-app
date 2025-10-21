import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-card.html',
  styleUrls: ['./city-card.css']
})
export class CityCard {
  @Input() city = 'San Francisco';
  @Input() weatherIcon = '☀️';
  @Input() temperature = 24;
  @Input() condition = 'Sunny';
  @Input() date = 'Monday, Oct 13';
  @Input() wind = 12;
  @Input() humidity = 65;
  @Input() pressure = 1013;
  @Input() lat!: number;
  @Input() lon!: number;
  
  @Output() deleteCity = new EventEmitter<{ lat: number, lon: number }>();
  @Output() openDetails = new EventEmitter<void>();

  onDelete() {
    this.deleteCity.emit({ lat: this.lat, lon: this.lon });
  }
  onOpen() {
  this.openDetails.emit();
}

  getWeatherIcon(): string {
    const condition = this.condition.toLowerCase();
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return '☀️';
    }
    
    if (condition.includes('cloud') || condition.includes('overcast')) {
      if (condition.includes('partly')) {
        return '⛅';
      }
      return '☁️';
    }
    
    
    if (condition.includes('rain')) {
      if (condition.includes('light')) {
        return '🌦️';
      }
      if (condition.includes('heavy') || condition.includes('storm')) {
        return '⛈️';
      }
      return '🌧️';
    }
    
    if (condition.includes('drizzle')) {
      return '🌦️';
    }
    
    if (condition.includes('thunder') || condition.includes('storm')) {
      return '⛈️';
    }
    
    
    if (condition.includes('snow')) {
      if (condition.includes('light')) {
        return '🌨️';
      }
      return '❄️';
    }
    
    
    if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) {
      return '🌫️';
    }
    
    
    if (condition.includes('wind')) {
      return '💨';
    }
    
    
    if (condition.includes('tornado')) {
      return '🌪️';
    }
    
    
    return this.weatherIcon || '☀️';
  }

  
  getBackgroundColor(): string {
    const condition = this.condition.toLowerCase();
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return 'bg-yellow-100';
    }
    if (condition.includes('cloud')) {
      return 'bg-gray-100';
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'bg-blue-100';
    }
    if (condition.includes('thunder') || condition.includes('storm')) {
      return 'bg-purple-100';
    }
    if (condition.includes('snow')) {
      return 'bg-cyan-50';
    }
    if (condition.includes('fog') || condition.includes('mist')) {
      return 'bg-slate-100';
    }
    
    return 'bg-yellow-100'; 
  }
}