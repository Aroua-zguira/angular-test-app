import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityCard } from '../city-card/city-card';
import { DetailsModal } from "../details-modal/details-modal";



@Component({
  selector: 'app-city-card-list',
  standalone: true,
  imports: [CommonModule, CityCard, DetailsModal],
  templateUrl: './city-card-list.html',
  styleUrl: './city-card-list.css'
})
export class CityCardList implements  OnChanges {
  @Input() cities: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() cityDeleted = new EventEmitter<{ lat: number, lon: number }>();
  modalOpen = false;
  selectedCityData: any | null = null;

onOpenDetails(city: any) {
  this.selectedCityData = city;    
  this.modalOpen = true;
}

  
  itemsPerPage = 8;
  currentPage = 1;

 

  ngOnChanges(changes: SimpleChanges) {
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