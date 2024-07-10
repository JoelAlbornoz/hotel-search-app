import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as HotelActions from './hotel.actions';
import { Hotel } from '../models/hotel';

export interface HotelState extends EntityState<any> {
  hotels: Hotel[];
  loading: boolean;
  error: any;
  selectedHotelId: string | null;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: HotelState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedHotelId: '1',
  hotels: [],
});

export const hotelReducer = createReducer(
  initialState,
  on(HotelActions.searchHotels, (state) => ({ ...state, loading: true })),
  on(HotelActions.searchHotelsSuccess, (state, { hotels }) => {
    return adapter.setAll(hotels, { ...state, loading: false });
  }),
  on(HotelActions.searchHotelsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(HotelActions.setSelectedHotel, (state, { hotelId }) => ({
    ...state,
    selectedHotelId: hotelId,
  }))
);
