import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSelectionComponent } from './answer-selection.component';

describe('AnswerSelectionComponent', () => {
  let component: AnswerSelectionComponent;
  let fixture: ComponentFixture<AnswerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
