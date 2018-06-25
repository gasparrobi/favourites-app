import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Book} from '../favorites/book';
import 'rxjs/add/observable/of';

@Injectable()
export class BookService {

  getFavouriteBooks(): Observable<Book[]> {

    return Observable.of([
      {
        id: 1,
        status: 'NEW',
        title: 'Book1',
        year: 1999,
        fullName: 'Book1 - 1999'
      },
      {
        id: 2,
        status: 'NEW',
        title: 'Book2',
        year: 2007,
        fullName: 'Book2 - 2007'
      },
      {
        id: 3,
        status: 'NEW',
        title: 'Book3',
        year: 2016,
        fullName: 'Book3 - 2016'
      }
    ]);
  }

}
