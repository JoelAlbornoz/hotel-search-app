import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import * as HotelSelectors from '../../store/hotel.selectors';

@Component({
  selector: 'app-hotel-map',
  standalone: true,
  imports: [],
  templateUrl: './hotel-map.component.html',
  styleUrl: './hotel-map.component.sass',
})
export class HotelMapComponent implements OnInit, AfterViewInit {
  private map: L.Map = L.map('map').setView([0, 0], 2);
  hotels$: Observable<any[]>;

  constructor(private store: Store) {
    this.hotels$ = this.store.pipe(select(HotelSelectors.selectAllHotels));
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    this.loadHotels();
  }

  private initMap() {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
  }

  private loadHotels() {
    this.hotels$.subscribe((hotels) => {
      hotels.forEach((hotel) => {
        const marker = L.marker([hotel.latitude, hotel.longitude]).addTo(
          this.map
        );
        marker.on('click', () => this.onMarkerClick(hotel));
      });
    });
  }

  private onMarkerClick(hotel: any) {
    const popup = L.popup()
      .setLatLng([hotel.latitude, hotel.longitude])
      .setContent(
        `<img src="${hotel.image}" alt="${hotel.name}" style="max-width: 200px;"><br>${hotel.name}`
      )
      .openOn(this.map);
  }
}
