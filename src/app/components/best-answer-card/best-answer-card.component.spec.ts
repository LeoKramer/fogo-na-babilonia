import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAnswerCardComponent } from './best-answer-card.component';

describe('BestAnswerCardComponent', () => {
  let component: BestAnswerCardComponent;
  let fixture: ComponentFixture<BestAnswerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestAnswerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
