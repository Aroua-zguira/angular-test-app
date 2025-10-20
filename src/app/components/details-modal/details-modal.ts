import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DetailedWeatherData {
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

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-modal.html',
  styleUrl: './details-modal.css'
})
export class DetailsModal {
  @Input() isOpen: boolean = false;
  @Input() weatherData: DetailedWeatherData | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    // Close modal when clicking on backdrop (not the modal content)
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getWeatherIcon(condition: string): string {
    const cond = condition.toLowerCase();
    
    if (cond.includes('clear') || cond.includes('sunny')) return '☀️';
    if (cond.includes('cloud')) {
      if (cond.includes('partly')) return '⛅';
      return '☁️';
    }
    if (cond.includes('rain')) {
      if (cond.includes('light')) return '🌦️';
      if (cond.includes('heavy') || cond.includes('storm')) return '⛈️';
      return '🌧️';
    }
    if (cond.includes('drizzle')) return '🌦️';
    if (cond.includes('thunder') || cond.includes('storm')) return '⛈️';
    if (cond.includes('snow')) return '❄️';
    if (cond.includes('fog') || cond.includes('mist')) return '🌫️';
    if (cond.includes('wind')) return '💨';
    
    return '☀️';
  }

  getWindDirection(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
}