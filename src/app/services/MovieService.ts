import {Injectable} from '@angular/core';
import {Film} from '../favorites/film';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../favorites/movie';

@Injectable()
export class MovieService {

  getFavouriteMovies(): Observable<Film[]> {

    return Observable.of([
      {
        id: 1,
        status: 'NEW',
        title: 'Die Hard',
        year: 1999,
        fullName: 'Die Hard - 1999'
      },
      {
        id: 2,
        status: 'NEW',
        title: 'Inception',
        year: 2007,
        fullName: 'Inception - 2007'
      },
      {
        id: 3,
        status: 'NEW',
        title: 'Rouge One',
        year: 2016,
        fullName: 'Rouge One - 2016'
      }
    ]);
  }

  getGenericMovies(): Observable<Movie[]> {

    return Observable.of([
      {
        id: 1,
        status: 'NEW',
        title: 'Die Hard',
        year: 1999,
        fullName: 'Die Hard - 1999'
      },
      {
        id: 2,
        status: 'NEW',
        title: 'Inception',
        year: 2007,
        fullName: 'Inception - 2007'
      },
      {
        id: 3,
        status: 'NEW',
        title: 'Rouge One',
        year: 2016,
        fullName: 'Rouge One - 2016'
      }
    ]);
  }

}
