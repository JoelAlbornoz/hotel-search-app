import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as HotelActions from '../../store/hotel.actions';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.sass',
})
export class SearchFormComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.store.dispatch(HotelActions.searchHotels(this.searchForm.value));
    }
  }
}
