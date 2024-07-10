import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-page-container',
  standalone: true,
  imports: [
    SearchFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './search-page-container.component.html',
  styleUrl: './search-page-container.component.sass',
})
export class SearchPageContainerComponent {}
