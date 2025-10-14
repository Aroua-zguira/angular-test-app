import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css'
})
export class Searchbar {
  searchQuery: string = '';
  isFocused: boolean = false;
  showSuggestions: boolean = false;
  suggestions: string[] = [];

  // Sample suggestions - replace with your actual data
  private allSuggestions: string[] = [
    'Angular components',
    'TypeScript tutorials',
    'Tailwind CSS examples',
    'Web development',
    'Search functionality'
  ];

  onFocus(): void {
    this.isFocused = true;
    if (this.searchQuery.length > 0) {
      this.showSuggestions = true;
    }
  }

  onBlur(): void {
    this.isFocused = false;
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  onSearch(): void {
    if (this.searchQuery.length > 0) {
      this.suggestions = this.allSuggestions.filter(s => 
        s.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showSuggestions = this.suggestions.length > 0;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }

    // Emit search event or call search service here
    console.log('Searching for:', this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.suggestions = [];
    this.showSuggestions = false;
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.onSearch();
  }
}