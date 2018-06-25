import {EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovieService} from '../services/MovieService';
import {Film} from '../favorites/film';

export class GenericComponent<T extends Object> implements OnInit {

  favoriteItem: T;
  readonly emptyItem: T;
  @Output() favoriteData = new EventEmitter<T>();
  favoriteItemForm: FormGroup;
  @Input() existingItems: Array<T> = [];
  selectedItem: T;  // item selected from dropdown menu
  addNewEnabled = false;  // add new checkbox checked or not
  formBuilder: FormBuilder;

  constructor(T: any, protected injector: Injector) {
    this.favoriteItem = new T();
    this.emptyItem = new T();
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    if (null == this.favoriteItem || undefined === this.favoriteItem ) {
      this.favoriteItem = Object.create(this.emptyItem);
    }
  }

// 'add new' html checkbox event
  checkboxEvent() {
    console.log('checkboxEvent');
    this.addNewEnabled = !this.addNewEnabled;
    this.favoriteItem = Object.create(this.emptyItem);
    this.selectedItem = null;
    this.doValidate(); // manually trigger validation
  }

  get titleControl() {
    return this.favoriteItemForm.get('titleControl');
  }

  // yearControl getter to use with [formControlName] in html
  get yearControl() {
    return this.favoriteItemForm.get('yearControl');
  }

  // emit new movie to favorite component
  doSubmit() {
    if (this.favoriteItemForm.valid) {
      this.favoriteData.emit(this.favoriteItem);
    }
  }

  // calling this method will trigger ControlValueAccessor's registerOnChange event which triggers the validate method in parent class
  doValidate() {}

  // if movie is selected from dropdown, it is immediately emitted if not null
  selectMovieEvent() {
    if (null !== this.selectedItem) {
      this.favoriteItem = this.selectedItem;
      this.favoriteData.emit(this.favoriteItem);
    }
  }

}
