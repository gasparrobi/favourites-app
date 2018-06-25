import {Component, EventEmitter, Injectable, Injector, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import {Book} from '../favorites/book';
import {BookService} from '../services/BookService';
import {Movie} from '../favorites/movie';
import {GenericComponent} from '../generic/generic.component';

@Component({
  selector: 'app-book',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BookComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BookComponent,
      multi: true
    }
  ],
  templateUrl: '../generic/generic.component.html',
  styleUrls: ['../generic/generic.component.scss']
})
export class BookComponent extends GenericComponent<Book> implements ControlValueAccessor, Validator {

  constructor(protected injector: Injector) {
    super(Book, injector);
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
      this.selectedItem = this.existingItems.filter((book) => book.id === this.favoriteItem.id)[0];
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
