import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Music} from '../favorites/music';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import {MusicService} from '../services/MusicService';


@Component({
  selector: 'app-music',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MusicComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MusicComponent,
      multi: true
    }
  ],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit, ControlValueAccessor, Validator {

  music: Music;
  @Output() musicData = new EventEmitter<Music>();
  musicForm: FormGroup;
  existingMusic: Music[];
  selectedMusic: Music;
  addNewEnabled: boolean;

  constructor(private formBuilder: FormBuilder,
              private musicService: MusicService) {
  }

  ngOnInit() {
    if (null == this.music || undefined === this.music ) {
      this.music = new Music();
    }
    this.musicService.getFavouriteMusic().subscribe((musicList) => {
      this.existingMusic = musicList;
    });
    this.addNewEnabled = false;
    this.createForm();
  }

  createForm(): void {
    this.musicForm = this.formBuilder.group({
      titleControl: [this.music.title, [ Validators.required, Validators.minLength(4) ]],
      yearControl: [this.music.year, [ Validators.required, Validators.maxLength(4), Validators.minLength(4) ]]
    });
  }

  checkboxEvent() {
    console.log('checkboxEvent');
    this.addNewEnabled = !this.addNewEnabled;
    this.music = new Music();
    this.selectedMusic = null;
    this.doValidate();
  }

  get titleControl() {
    return this.musicForm.get('titleControl');
  }

  get yearControl() {
    return this.musicForm.get('yearControl');
  }

  doSubmit() {
    if (this.musicForm.valid) {
      this.musicData.emit(this.music);
    }
  }

  selectMusicEvent() {
    this.music = this.selectedMusic;
    this.musicData.emit(this.music);
  }

  doValidate() {
    //  triggering validation. see: registerOnChange() method.
  }

  writeValue(obj: any): void {
    if (undefined !== obj) {
      this.music = obj;
    }
    try {
      this.selectedMusic = this.existingMusic.filter((music) => music.id === this.music.id)[0];
    } catch (e) {
      this.selectedMusic = new Music();
    }
  }

  registerOnChange(fn: any): void {
    this.doValidate = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.addNewEnabled) {
      return this.selectedMusic == null ? { 'selectError': { valid: false } } : null;
    }
    if (this.musicForm.invalid) {
      return { 'musicFormError': { valid: false } };
    } else { return null; }
  }


}
