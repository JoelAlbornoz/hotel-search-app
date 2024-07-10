import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as HotelActions from './hotel.actions';
import { Router } from '@angular/router';

interface HotelApiResponse {
  hotels: any[]; // Replace 'any' with a more specific type if you know the hotel structure
  // Add other properties that the API returns, if any
}

@Injectable()
export class HotelEffects {
  searchHotels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HotelActions.searchHotels),
      mergeMap((action) =>
        this.http
          .get<HotelApiResponse>(
            'https://beta.id90travel.com/api/v3/hotels.json',
            {
              params: {
                checkin: action.checkin,
                checkout: action.checkout,
                destination: action.destination,
                guests: action.guests.toString(),
                rooms: '1',
                latitude: action.latitude.toString(),
                longitude: action.longitude.toString(),
                sort_criteria: 'Overall',
                sort_value: '',
                sort_order: 'desc',
                per_page: '500',
                page: '1',
                currency: 'USD',
                price_low: '',
                price_high: '',
                'guests[]': action.guestsArray.map((g) => g.toString()),
              },
            }
          )
          .pipe(
            map((response) =>
              HotelActions.searchHotelsSuccess({ hotels: response['hotels'] })
            ),
            tap(() => {
              // Perform redirection here
              this.router.navigate(['/results']);
            }),
            catchError((error) =>
              of(HotelActions.searchHotelsFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
