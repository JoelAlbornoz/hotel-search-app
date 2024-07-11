import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
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
  styleUrls: ['./search-form.component.sass'],
})
export class SearchFormComponent implements OnInit {
  @ViewChild('search', { static: true }) searchElementRef!: ElementRef;

  searchForm: FormGroup;
  latitude: number = 0;
  longitude: number = 0;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private ngZone: NgZone
  ) {
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement as HTMLInputElement
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();

          if (place.geometry) {
            this.latitude = place.geometry.location?.lat() || 0;
            this.longitude = place.geometry.location?.lng() || 0;
            this.searchForm.patchValue({
              destination: place.formatted_address,
            });
          }
        });
      });
    } else {
      console.error('Google Maps JavaScript API is not loaded');
    }
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
}
