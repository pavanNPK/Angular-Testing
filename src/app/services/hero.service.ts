import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export class Hero {
  id!: number;
  firstname!: string;
}
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    let heroesData = this.http.get<Hero[]>('https://fakerapi.it/api/v2/users');
    console.log(heroesData);
    return heroesData;
  }
}
