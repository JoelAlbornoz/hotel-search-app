import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelMapComponent } from './components/hotel-map/hotel-map.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    SearchFormComponent,
    HotelListComponent,
    HotelMapComponent,
    MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'hotel-search-app';
}
