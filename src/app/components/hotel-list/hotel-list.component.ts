import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as HotelSelectors from '../../store/hotel.selectors';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.sass',
})
export class HotelListComponent implements OnInit {
  hotels$: Observable<any[]>;

  constructor(private store: Store) {
    this.hotels$ = this.store.pipe(select(HotelSelectors.selectAllHotels));
  }

  ngOnInit() {}
}
