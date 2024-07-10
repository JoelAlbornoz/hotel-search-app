import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import * as HotelSelectors from '../../store/hotel.selectors';
import { CommonModule } from '@angular/common';
import * as HotelActions from '../../store/hotel.actions';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-hotel-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-map.component.html',
  styleUrl: './hotel-map.component.sass',
})
export class HotelMapComponent implements AfterViewInit {
  @ViewChild('map') private mapContainer!: ElementRef;
  private map!: L.Map;
  hotels$: Observable<Hotel[]>;

  constructor(private store: Store) {
    this.hotels$ = this.store.pipe(select(HotelSelectors.selectAllHotels));
  }

  ngAfterViewInit() {
    this.initMap();
    this.loadHotels();
  }

  private initMap() {
    if (this.mapContainer) {
      this.map = L.map(this.mapContainer.nativeElement).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );
    }

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  private loadHotels() {
    const markers: L.Marker[] = [];
    this.hotels$.subscribe((hotels) => {
      hotels.forEach((hotel) => {
        if (
          typeof hotel.location.latitude === 'number' &&
          typeof hotel.location.longitude === 'number'
        ) {
          const marker = L.marker([
            hotel.location.latitude,
            hotel.location.longitude,
          ]).addTo(this.map);
          marker.on('click', () => this.onMarkerClick(hotel));

          markers.push(marker);
        } else {
          console.warn(`Invalid coordinates for hotel: ${hotel.name}`);
        }

        const group = L.featureGroup(markers);

        this.map.fitBounds(group.getBounds(), {
          padding: [50, 50],
        });
      });
    });
  }

  private onMarkerClick(hotel: Hotel) {
    this.store.dispatch(HotelActions.setSelectedHotel({ hotelId: hotel.id }));
    const popup = L.popup()
      .setLatLng([hotel.location.latitude, hotel.location.longitude])
      .setContent(
        `<img src="${hotel.image}" alt="${hotel.name}" style="max-width: 300px; padding: 10px;" border-width="1" border-style="solid", border-radius="5px"><br>${hotel.name}`
      )
      .openOn(this.map);
  }
}
