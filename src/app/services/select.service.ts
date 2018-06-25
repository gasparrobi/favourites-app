import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SelectService {
  elementReady = new EventEmitter<boolean>();

  selected(value) {
    if ('' === value) {
      this.elementReady.emit(false);
    } else {
      this.elementReady.emit(true);
    }
  }

}
