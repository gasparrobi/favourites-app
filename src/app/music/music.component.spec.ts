import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicComponent } from './music.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { By } from '@angular/platform-browser';
import {FormGroup, FormsModule} from '@angular/forms';

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicComponent ],
      imports: [ FormsModule  ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill music.title field aaa', () => {
    const titleInput  = fixture.debugElement.query(By.css('#music-title'));
    titleInput.nativeElement.value = 'aaa';
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    const button = fixture.debugElement.query(By.css('#music-button'));
    const musicField = component.music.title;
    console.log(component.music);
    expect('aaa').toEqual(musicField);
  });

  it('should fill music.year field with 1999', () => {
    const titleInput  = fixture.debugElement.query(By.css('#music-year'));
    titleInput.nativeElement.value = 1999;
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    const musicField = component.music.year;
    console.log(component.music);
    expect('1999').toEqual('3333');
  });

});
