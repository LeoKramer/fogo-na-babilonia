import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSelectionComponent } from './question-selection.component';

describe('QuestionSelectionComponent', () => {
  let component: QuestionSelectionComponent;
  let fixture: ComponentFixture<QuestionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
