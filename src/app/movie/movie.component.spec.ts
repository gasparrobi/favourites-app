import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill movie.title field Inception', () => {
    const titleInput  = fixture.debugElement.query(By.css('#movie-title'));
    titleInput.nativeElement.value = 'Inception';
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    const movieField = component.movie.title;
    console.log(component.movie);
    expect('Inception').toEqual(movieField);
  });

  it('should fill movie.year field with 1999', () => {
    const titleInput  = fixture.debugElement.query(By.css('#movie-year'));
    titleInput.nativeElement.value = 1999;
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    const movieField = component.movie.year;
    console.log(component.movie);
    expect('1999').toEqual('1111');
  });

});
