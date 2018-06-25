import {Component, OnInit} from '@angular/core';
import {FavouritesFormData} from "./formdata";
import {FamilyMember} from "./favorites/familymember";
import {Film} from './favorites/film';
import {Music} from './favorites/music';
import {FavoritesComponent} from './favorites/favorites.component';
import {Book} from './favorites/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  formData = null;
  familyMembers = [{id: 1121, fullName: 'mother'}, {id: 1122, fullName: 'father'}];



  constructor() {
  }
  ngOnInit() {
    this.formData = new FavouritesFormData();
    this.formData.familyMember = this.familyMembers[1];
    const sampleFilm = new Film();
    sampleFilm.id = 1;
    sampleFilm.year = 1999;
    sampleFilm.title = 'Die Hard';
    sampleFilm.fullName = 'Die Hard - 1999';
    this.formData.film = sampleFilm;
    this.formData.music = new Music();
    this.formData.book = new Book();
  }

  showFormData(formData: FavouritesFormData) {
    console.log(formData);
  }

}
