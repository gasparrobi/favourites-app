import {Component, Injector} from '@angular/core';
import { GenericComponent } from '../generic/generic.component';
import { Movie } from '../favorites/movie';
import {MovieService} from '../services/MovieService';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
  Validator, Validators
} from '@angular/forms';

@Component({
  selector: 'app-test-movie',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TestMovieComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: TestMovieComponent,
      multi: true
    }
  ],
  templateUrl: './test-movie.component.html',
  styleUrls: ['./test-movie.component.scss']
})
export class TestMovieComponent extends GenericComponent<Movie> implements ControlValueAccessor, Validator {

  private movieService: MovieService;

  constructor(protected injector: Injector) {
    super(Movie, injector);
    this.movieService = injector.get(MovieService);
    this.createForm();
  }

  createForm() {
    this.favoriteItemForm = this.formBuilder.group({
      titleControl: [this.favoriteItem.title, [ Validators.required, Validators.minLength(4) ]],
      yearControl: [this.favoriteItem.year, [ Validators.required, Validators.maxLength(4), Validators.minLength(4) ]]
    });
  }

  // ControlValueAccessor interface implementation (writeValue, registerOnChange, registerOnTouch)

  // https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83
  // https://alligator.io/angular/custom-form-control/
  // https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73
  writeValue(obj: any): void {
    if (undefined !== obj) {
      this.favoriteItem = obj;
    }
    try {
      this.selectedItem = this.existingItems.filter((item) => item.id === this.favoriteItem.id)[0];
    } catch (e) {
      this.selectedItem = null;
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
      return this.selectedItem == null ? {'selectError': {valid: false}} : null;
    }
    if (this.favoriteItemForm.invalid) {
      return {'movieFormError': {valid: false}};
    }
    return null;
  }

}
