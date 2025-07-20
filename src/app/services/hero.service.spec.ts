// we have used the jasmine spies to mock the http service and simulate the response
// and observe the behavior of the service both for success and failure
// another one is validating the result and checking the spy methods called times

import { HeroService } from './hero.service';
import {HttpClient, HttpErrorResponse, provideHttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

describe('HeroService', () => {
  let service: HeroService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {


    // // configure the testing module
    // TestBed.configureTestingModule({
    //   // provide the HttpClient and HttpClientTestingModule
    //   // this is the way to configure the testing module for testing
    //   // the HttpClient is used to make HTTP requests
    //   // the HttpClientTestingModule is used to simulate the HTTP responses
    //   providers: [provideHttpClient(), provideHttpClientTesting()],
    // });
    // // get the instance of the HttpTestingController
    // // this is used to verify that the requests are made as expected
    // const httpTesting = TestBed.inject(HttpTestingController);


    // we create a spy object for HttpClient with the name 'HttpClient' and it has one method 'get'
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // and we inject the spy object into the service
    service = new HeroService(httpClientSpy);
  });

  // here we test the getHeroes method for success
  it('should return expected heroes (HttpClient called once)', (done : DoneFn) => {
    const expectedHeroes = [
      { id: 11, firstname: 'Mr. Nice' },
      { id: 12, firstname: 'Narco' },
      { id: 13, firstname: 'Bombasto' },
      { id: 14, firstname: 'Celeritas' },
      { id: 15, firstname: 'Magneta' },
      { id: 16, firstname: 'RubberMan' },
      { id: 17, firstname: 'Dynama' },
      { id: 18, firstname: 'Dr IQ' },
      { id: 19, firstname: 'Magma' },
      { id: 20, firstname: 'Tornado' }
    ];
    // we are call the getHeroes method and we expect it to return the expectedHeroes array using the of function
    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    // we are verify that the getHeroes method. it matches the expectedHeroes array
    service.getHeroes().subscribe({
      next: heroes =>{ expect(heroes).withContext('expected heroes').toEqual(expectedHeroes); done()},
      error: done.fail
    });

    // we are verify that the HttpClient.get method is called once
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  })

  // here we test the getHeroes method for error
  it('should return error when HttpClient returns error 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 not error',
      status: 404,
      statusText: 'Not Found'
    });

    // it will return the errorResponse. if request fails it will throw an error
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    service.getHeroes().subscribe({
      next: heroes => done.fail('expected an error, not heroes'),
      error: error => {expect(error.message).toContain('404 Not Found'); done()}
    });
  })
});
