import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Film} from '../favorites/film';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import {MovieService} from '../services/MovieService';

@Component({
  selector: 'app-movie',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MovieComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MovieComponent,
      multi: true
    }
  ],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy, Validator {

  movie: Film;
  @Output() movieData = new EventEmitter<Film>();
  movieForm: FormGroup;
  existingMovies: Film[];
  selectedMovie: Film;  // movie selected from dropdown menu
  addNewEnabled: boolean;  // add new movie checkbox checked or not

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService) {
  }

  ngOnInit() {
    console.log('ONINIT');
    // if there is no movie from formData.film
    if (null == this.movie || undefined === this.movie ) {
      this.movie = new Film();
    }
    this.movieService.getFavouriteMovies().subscribe((movies) => {
      this.existingMovies =  movies;
    });
    this.addNewEnabled = false;
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NGCHANGE EVENT!!!');
  }

  ngOnDestroy(): void {
    console.log('ONDESTROY EVENT!!!!');
  }


  createForm() {
    this.movieForm = this.formBuilder.group({
      titleControl: [this.movie.title, {validators: [ Validators.required, Validators.minLength(4)]}],
      yearControl: [this.movie.year, [ Validators.required, Validators.maxLength(4), Validators.minLength(4) ]]
    });
  }

  // EXAMPLE form group without using formBuilder. This is what formBuilder does with simpler syntax
  exampleForm() {
    const exampleFormGroup = new FormGroup({
      titleControl: new FormControl('', [Validators.required, Validators.maxLength(60)], null)
    });
  }

  // titleControl getter to use with [formControlName] in html
  get titleControl() {
    return this.movieForm.get('titleControl');
  }

  // yearControl getter to use with [formControlName] in html
  get yearControl() {
    return this.movieForm.get('yearControl');
  }

  // emit new movie to favorite component
  doSubmit() {
    if (this.movieForm.valid) {
      this.movieData.emit(this.movie);
    }
  }

  // 'add new movie' html checkbox event
  checkboxEvent() {
    console.log('checkboxEvent');
    this.addNewEnabled = !this.addNewEnabled;
    this.movie = new Film();
    this.selectedMovie = null;
    this.doValidate(); // manually trigger validation
  }

  // calling this method will trigger ControlValueAccessor's registerOnChange event which triggers Validator's validate method. see below
  doValidate() {
  }

  // if movie is selected from dropdown, it is immediately emitted if not null
  selectMovieEvent() {
    if (null !== this.selectedMovie) {
      this.movie = this.selectedMovie;
      this.movieData.emit(this.movie);
    }
  }

  // ControlValueAccessor interface implementation (writeValue, registerOnChange, registerOnTouch)

  // https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83
  // https://alligator.io/angular/custom-form-control/
  // https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73
  writeValue(obj: any): void {
    if (undefined !== obj) {
      this.movie = obj;
    }
    try {
      this.selectedMovie = this.existingMovies.filter((movie) => movie.id === this.movie.id)[0];
    } catch (e) {
      this.selectedMovie = null;
    }
  }

  registerOnChange(fn: any): void {
    this.doValidate = fn;
  }

  registerOnTouched(fn: any): void {
  }

  // Validator interface implementation
  // returning null means valid
  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.addNewEnabled) {
      return this.selectedMovie == null ? {'selectError': {valid: false}} : null;
    }
    if (this.movieForm.invalid) {
      return {'movieFormError': {valid: false}};
    }
    return null;
  }

}
