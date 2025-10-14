// city-card-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityCard } from '../city-card/city-card';

interface CityData {
  city: string;
  weatherIcon: string;
  temperature: number;
  condition: string;
  date: string;
  wind: number;
  humidity: number;
  pressure: number;
}

@Component({
  selector: 'app-city-card-list',
  standalone: true,
  imports: [CommonModule, CityCard],
  templateUrl: './city-card-list.html',
  styleUrl: './city-card-list.css'
})
export class CityCardList {
  cities: CityData[] = [
    {
      city: 'San Francisco',
      weatherIcon: '☀️',
      temperature: 24,
      condition: 'Sunny',
      date: 'Monday, Oct 14',
      wind: 12,
      humidity: 65,
      pressure: 1013
    },
    {
      city: 'New York',
      weatherIcon: '⛅',
      temperature: 18,
      condition: 'Partly Cloudy',
      date: 'Monday, Oct 14',
      wind: 15,
      humidity: 72,
      pressure: 1015
    },
    {
      city: 'London',
      weatherIcon: '🌧️',
      temperature: 12,
      condition: 'Rainy',
      date: 'Monday, Oct 14',
      wind: 20,
      humidity: 85,
      pressure: 1008
    },
    {
      city: 'Tokyo',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Paris',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Berlin',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Madrid',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Rome',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Sydney',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
        {
      city: 'Berlin',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Madrid',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Rome',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Sydney',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
        {
      city: 'Berlin',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Madrid',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Rome',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    },
    {
      city: 'Sydney',
      weatherIcon: '🌤️',
      temperature: 22,
      condition: 'Mostly Sunny',
      date: 'Monday, Oct 14',
      wind: 8,
      humidity: 60,
      pressure: 1018
    }
  ];

  // Pagination properties
  itemsPerPage = 8;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.cities.length / this.itemsPerPage);
  }

  get paginatedCities(): CityData[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.cities.slice(start, end);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}