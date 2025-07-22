import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get('https://jsonplaceholder.typicodee.com/posts').pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500) {
          console.log("While calling config service got 500", err);
          return throwError(() => new Error('Internal Server Error'));
        } else if (err.status === 0) {
          console.log("While calling config service got 500", err);
          return throwError(() => new Error('Network Error! Please check your internet connection'));
        } else {
          console.log("While calling config service got something else", err);
          return throwError(() => new Error('Something went wrong. Please try again'));
        }
      })
    )
  }
}
