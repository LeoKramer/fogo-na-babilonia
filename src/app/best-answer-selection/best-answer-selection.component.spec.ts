import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAnswerSelectionComponent } from './best-answer-selection.component';

describe('BestAnswerSelectionComponent', () => {
  let component: BestAnswerSelectionComponent;
  let fixture: ComponentFixture<BestAnswerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestAnswerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAnswerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
