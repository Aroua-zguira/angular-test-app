import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { GeoLocationService } from '../../services/geo-location';
import { Location } from '../../models/location';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.html',
  styleUrls: ['./searchbar.css']
})
export class Searchbar implements OnInit, OnDestroy {
  @Output() locationSelected = new EventEmitter<Location>();
  
  searchQuery: string = '';
  isFocused: boolean = false;
  showSuggestions: boolean = false;
  suggestions: Location[] = [];
  isLoading: boolean = false;
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private geoLocationService: GeoLocationService) {}

  ngOnInit(): void {
    // Setup autocomplete with debounce
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only emit if value changed
      switchMap(query => {
        if (query.trim().length < 2) {
          this.isLoading = false;
          return [];
        }
        this.isLoading = true;
        return this.geoLocationService.searchLocations(query, 8);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (locations) => {
        this.suggestions = locations;
        this.showSuggestions = locations.length > 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching locations:', error);
        this.suggestions = [];
        this.showSuggestions = false;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFocus(): void {
    this.isFocused = true;
    if (this.searchQuery.length >= 2 && this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  onBlur(): void {
  this.isFocused = false;
  setTimeout(() => {
    if (!document.activeElement?.closest('.suggestion-item')) {
      this.showSuggestions = false;
    }
  }, 200);
}

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.suggestions = [];
    this.showSuggestions = false;
    this.isLoading = false;
  }

  selectSuggestion(location: Location): void {
    this.searchQuery = location.name ;
    this.showSuggestions = false;
    this.locationSelected.emit(location);
    console.log('Selected location:', location);
  }

}