import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics {
  @Input() cityNumber: number = 0
  @Input() avgTemperature: number = 0
  @Input() avgHumidity: number = 0

}
