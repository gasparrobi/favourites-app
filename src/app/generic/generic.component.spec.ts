import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericComponent } from './generic.component';
import {Film} from '../favorites/film';

describe('GenericComponent', () => {
  let component: GenericComponent<Film>;
  let fixture: ComponentFixture<GenericComponent<Film>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
