import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { hotelReducer } from './store/hotel.reducer';
import { provideEffects } from '@ngrx/effects';
import { HotelEffects } from './store/hotel.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({ hotels: hotelReducer }),
    provideEffects([HotelEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideHttpClient(),
  ],
};
