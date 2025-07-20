import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  constructor() { }

  getValue() {
    return 'real value'
  }

  getObservableValue(){
    return of('observable value')
  }

  getPromiseValue() {
    return Promise.resolve('promise value')
  }
}
