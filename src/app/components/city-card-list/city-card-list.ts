import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-city-card-list',
  standalone: true,
  imports: [CommonModule, CityCard],
  templateUrl: './city-card-list.html',
  styleUrl: './city-card-list.css'
})
export class CityCardList implements OnInit, OnChanges {
  @Input() cities: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() cityDeleted = new EventEmitter<{ lat: number, lon: number }>();

  // Pagination properties
  itemsPerPage = 8;
  currentPage = 1;

  ngOnInit() {
    // Component initialization
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reset to first page when cities data changes
    if (changes['cities'] && !changes['cities'].firstChange) {
      this.currentPage = 1;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.cities.length / this.itemsPerPage);
  }

  get paginatedCities(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.cities.slice(start, start + this.itemsPerPage);
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

  onCityDeleted(location: { lat: number, lon: number }) {
    this.cityDeleted.emit(location);
  }
}