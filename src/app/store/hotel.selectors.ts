import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HotelState, adapter } from './hotel.reducer';

export const selectHotelState = createFeatureSelector<HotelState>('hotels');

export const {
  selectAll: selectAllHotels,
  selectEntities: selectHotelEntities,
  selectIds: selectHotelIds,
  selectTotal: selectTotalHotels,
} = adapter.getSelectors(selectHotelState);

export const selectHotelLoading = createSelector(
  selectHotelState,
  (state: HotelState) => state.loading
);

export const selectHotelError = createSelector(
  selectHotelState,
  (state: HotelState) => state.error
);
