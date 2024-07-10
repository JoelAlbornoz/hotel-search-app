import { createAction, props } from '@ngrx/store';

export const searchHotels = createAction(
  '[Hotel] Search Hotels',
  props<{
    destination: string;
    checkin: string;
    checkout: string;
    guests: number;
    latitude: number;
    longitude: number;
    guestsArray: number[];
  }>()
);

export const searchHotelsSuccess = createAction(
  '[Hotel] Search Hotels Success',
  props<{ hotels: any[] }>()
);

export const searchHotelsFailure = createAction(
  '[Hotel] Search Hotels Failure',
  props<{ error: any }>()
);

import { Hotel } from '../models/hotel';

export const selectHotel = createAction(
  '[Hotel] Select Hotel',
  props<{ hotel: Hotel }>()
);
