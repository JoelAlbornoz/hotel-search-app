import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as HotelActions from './hotel.actions';

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
                // Add other required parameters here
              },
            }
          )
          .pipe(
            map((response) =>
              HotelActions.searchHotelsSuccess({ hotels: response['hotels'] })
            ),
            catchError((error) =>
              of(HotelActions.searchHotelsFailure({ error }))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
