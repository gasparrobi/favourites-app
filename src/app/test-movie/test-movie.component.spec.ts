import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMovieComponent } from './test-movie.component';

describe('TestMovieComponent', () => {
  let component: TestMovieComponent;
  let fixture: ComponentFixture<TestMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
