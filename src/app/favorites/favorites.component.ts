import {ApplicationRef, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FamilyMember} from './familymember';
import {FavouritesFormData} from '../formdata';
import {Music} from './music';
import {Film} from './film';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Book} from './book';
import {GenericComponent} from '../generic/generic.component';
import {Movie} from './movie';
import {MovieService} from '../services/MovieService';
import {BookService} from '../services/BookService';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  @Input() familyMembers: Array<FamilyMember>;
  @Input() formData: FavouritesFormData;
  @Output() elementReady = new EventEmitter<boolean>();
  ready: boolean; // controls visibility of child components. true if formData is not empty, or a familymember is selected from dropdown.
  selectedMember: FamilyMember;
  enableList; // check which element is active and enable/disable formcontrol accordingly. (title: radio button value)
  favouriteForm: FormGroup;
  existingMovieItems: Movie[];
  existingBookItems: Book[];
  radioReset: boolean;

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService,
              private bookService: BookService,
              private applicationRef: ApplicationRef) {}

  ngOnInit() {
    this.movieService.getGenericMovies().subscribe((items) => {
      this.existingMovieItems = items.map(item => item);
    });

    this.bookService.getFavouriteBooks().subscribe( items => {
      this.existingBookItems = items.map( item => item);
    });

    this.enableList = [
      {title: 'new movie', enabled: true, formControl: 'movieControl'},
      {title: 'new music', enabled: false, formControl: 'musicControl'},
      {title: 'new book', enabled: false, formControl: 'bookControl'},
      ];
    // this.formData = new FavouritesFormData();
    console.log(this.formData);
    this.selectedMember = this.formData.familyMember;
    this.ready = !(undefined === this.formData.film && undefined === this.formData.music && undefined === this.formData.book);
    this.createForm();
  }

  // using movie and music component as formControl, see movie component implementation for details (ControlValueAccessor)
  createForm() {
    this.favouriteForm = this.formBuilder.group({
      movieControl: [this.formData.film, []],
      musicControl: [this.formData.music, []],
      bookControl: [this.formData.book, []]
    });
  }

  onSelectChange(value) {
    console.log('select change event: ');
    if (null === value) {
      this.ready = false; // hide child components
    } else {
      this.ready = false;
      this.formData.familyMember = this.selectedMember;
      this.formData.music = null;
      this.formData.film = null;
      this.formData.book = null;
      // reset radio buttons to iniial state
      this.enableList.forEach((item) => {
        item.enabled = (item.title === 'new movie');
      });
      // detecting changes, triggering child component's onDestroy event
      this.applicationRef.tick();
      this.ready = true;
    }
  }

  // receiving data on movie component emit event
  receiveMovieData(movie: any) {
    this.formData.film = movie;
    this.formData.music = null;
    this.formData.book = null;
    console.log('received Movie Data. formData: ');
    console.log(this.formData);
  }

  // receiving data on music component emit event
  receiveMusicData(music: Music) {
    this.formData.music = music;
    this.formData.film = null;
    this.formData.book = null;


    console.log('received Music Data. formData: ');
    console.log(this.formData);
  }

  // receiving data on book component emit event
  receiveBookData(book: Book) {
    this.formData.book = book;
    this.formData.film = null;
    this.formData.music = null;

    console.log('received Book Data. formData: ');
    console.log(this.formData);
  }

  // toggle child components visibility
  radioOnClick(event) {
    console.log('radio click event');
    this.enableList.forEach((item) => {
      item.enabled = (item.title === event.srcElement.value);
    });
    this.manipulateFormControl();
    console.log(this.favouriteForm);
  }

  // enabling formcontrol validations based on chosen user choice
  // music and movie components cannot be valid at the same time, so we need to enable/disable them dynamically.
  manipulateFormControl() {
    console.log('enabling/disabling formColtrols');
    this.enableList.forEach(item => {
      if (item.enabled) {
        this.favouriteForm.get(item.formControl).enable();
      } else {
        this.favouriteForm.get(item.formControl).disable();
      }
    });
  }

}
