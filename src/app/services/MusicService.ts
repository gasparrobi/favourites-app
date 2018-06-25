import {Injectable} from '@angular/core';
import {Music} from '../favorites/music';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MusicService {

  getFavouriteMusic(): Observable<Music[]> {

    return Observable.of([
      {
        id: 1,
        status: 'NEW',
        title: 'Music1',
        year: 1999,
        fullName: 'Music1 - 1999'
      },
      {
        id: 2,
        status: 'NEW',
        title: 'Music2',
        year: 2007,
        fullName: 'Music2 - 2007'
      },
      {
        id: 3,
        status: 'NEW',
        title: 'Music3',
        year: 2016,
        fullName: 'Music3 - 2016'
      }
    ]);
  }

}
