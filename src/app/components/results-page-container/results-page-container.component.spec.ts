import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPageContainerComponent } from './results-page-container.component';

describe('ResultsPageContainerComponent', () => {
  let component: ResultsPageContainerComponent;
  let fixture: ComponentFixture<ResultsPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsPageContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
