// city-card.component.ts
import { Component, Input } from '@angular/core';
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
}