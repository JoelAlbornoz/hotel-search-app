import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as HotelActions from '../../store/hotel.actions';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.sass',
})
export class SearchFormComponent {
  searchForm: FormGroup;
  latitude: number = 0;
  longitude: number = 0;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private geolocationService: GeolocationService
  ) {
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
    });

    this.getLocation();
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.store.dispatch(
        HotelActions.searchHotels(this.parseToBackend(this.searchForm.value))
      );
    }
  }

  parseToBackend(data: any) {
    const checkin = new Date(data.checkin).toISOString().split('T')[0];
    const checkout = new Date(data.checkout).toISOString().split('T')[0];
    return {
      ...data,
      checkin,
      checkout,
      latitude: this.latitude,
      longitude: this.longitude,
      guestsArray: ['1'],
    };
  }

  getLocation() {
    this.geolocationService.getPosition().subscribe({
      next: (position: GeolocationPosition) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.errorMessage = '';
      },
      error: (error: GeolocationPositionError) => {
        this.errorMessage = `Error: ${error.message}`;
        this.latitude = 0;
        this.longitude = 0;
      },
    });
  }
}
