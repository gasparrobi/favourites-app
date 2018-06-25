import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MovieComponent } from './movie/movie.component';
import { MusicComponent } from './music/music.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectService} from './services/select.service';
import {MovieService} from './services/MovieService';
import {MusicService} from './services/MusicService';
import { BookComponent } from './book/book.component';
import {BookService} from './services/BookService';
import { GenericComponent } from './generic/generic.component';
import { TestMovieComponent } from './test-movie/test-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    MovieComponent,
    MusicComponent,
    BookComponent,
    TestMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SelectService,
    MovieService,
    MusicService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
