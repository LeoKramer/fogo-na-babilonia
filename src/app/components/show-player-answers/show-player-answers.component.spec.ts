import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlayerAnswersComponent } from './show-player-answers.component';

describe('ShowPlayerAnswersComponent', () => {
  let component: ShowPlayerAnswersComponent;
  let fixture: ComponentFixture<ShowPlayerAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlayerAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlayerAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
