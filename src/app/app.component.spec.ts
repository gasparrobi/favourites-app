import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {FavouritesFormData} from './formdata';
import {NO_ERRORS_SCHEMA} from '@angular/core';


fdescribe('AppComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ FormsModule ],
      providers: [
        ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));



  it('should create the app APP', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app);
    expect(app.title).toEqual('app');
  }));





  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
