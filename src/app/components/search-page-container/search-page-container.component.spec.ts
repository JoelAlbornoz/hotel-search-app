import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageContainerComponent } from './search-page-container.component';

describe('SearchPageContainerComponent', () => {
  let component: SearchPageContainerComponent;
  let fixture: ComponentFixture<SearchPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
