import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form class="search-form">
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <!-- Loop for array in HousingService using template in HousingLocationComponent -->
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // empty array to store the housing locations
  housingLocationList: HousingLocation[] = [];
  // inject service
  housingService: HousingService = inject(HousingService);
  // filter results: values that match the search criteria entered by the user
  filteredLocationList: HousingLocation[] = [];
  // event handler for form button 
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

constructor() {
  this.housingLocationList = this.housingService.getAllHousingLocations();
  // filter results
  this.filteredLocationList = this.housingLocationList;

}
}
