import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, forkJoin, Observable, tap } from 'rxjs';
import * as HotelSelectors from '../../store/hotel.selectors';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.sass',
})
export class HotelListComponent implements OnInit, AfterViewInit {
  @ViewChildren('hotelItem') hotelItems!: QueryList<any>;
  hotels$: Observable<Hotel[]>;
  selectedHotelId$!: Observable<string | null>;

  constructor(private store: Store) {
    this.hotels$ = this.store.pipe(select(HotelSelectors.selectAllHotels));
    this.selectedHotelId$ = this.store.pipe(
      select(HotelSelectors.selectSelectedHotelId)
    );
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.scrollToSelectedHotel();
  }
  //Necesita Refactorizar, subscripciones anidadas
  private scrollToSelectedHotel() {
    this.selectedHotelId$.subscribe((id) => {
      this.hotels$.subscribe((h) => {
        const index = h.findIndex((hotel) => hotel.id === id);
        this.hotelItems
          .toArray()
          [index]?._elementRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
      });
    });
  }
}
