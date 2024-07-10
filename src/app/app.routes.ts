import { Routes } from '@angular/router';
import { SearchPageContainerComponent } from './components/search-page-container/search-page-container.component';
import { ResultsPageContainerComponent } from './components/results-page-container/results-page-container.component';

export const routes: Routes = [
  { path: '', component: SearchPageContainerComponent },
  { path: 'results', component: ResultsPageContainerComponent },
];
