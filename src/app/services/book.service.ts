import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Book {
  id: number;
  title: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'https://fakerapi.it/api/v2/books';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }
}
