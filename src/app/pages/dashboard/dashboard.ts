import { Component } from '@angular/core';
import { Searchbar } from "../../components/searchbar/searchbar";
import { CityCard } from "../../components/city-card/city-card";
import { Statistics } from "../../components/statistics/statistics";
import { CityCardList } from "../../components/city-card-list/city-card-list";

@Component({
  selector: 'app-dashboard',
  imports: [Searchbar, Statistics, CityCardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
