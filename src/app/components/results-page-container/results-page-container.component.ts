import { Component } from '@angular/core';
import { HotelMapComponent } from '../hotel-map/hotel-map.component';
import { HotelListComponent } from '../hotel-list/hotel-list.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-results-page-container',
  standalone: true,
  imports: [
    CommonModule,
    HotelMapComponent,
    HotelListComponent,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './results-page-container.component.html',
  styleUrl: './results-page-container.component.sass',
})
export class ResultsPageContainerComponent {}
