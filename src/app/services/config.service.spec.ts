import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should handle error response correctly', () => {
    const errorResponse = {
      status: 500,
      statusText: 'Not Found'
    };

    // it will return the errorResponse. if request fails it will throw an error
    service.getConfig().subscribe({
      next: heroes => fail('expected an error, not heroes'),
      error: error => expect(error.message).toBe('Internal Server Error')
    });

    const req = httpTesting.expectOne('https://jsonplaceholder.typicodee.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush('Internal Server Error', errorResponse);

  });

  it('should handle network error correctly', (done) => {
    service.getConfig().subscribe({
      next: heroes => fail('expected an error, not heroes'),
      error: (error) => {expect(error.message).toEqual('Network Error! Please check your internet connection'); done()}
    });

    const req = httpTesting.expectOne('https://jsonplaceholder.typicodee.com/posts');
    expect(req.request.method).toBe('GET');
    req.error(new ProgressEvent('Network Error'));
  })

  it('should handle something error correctly', (done) => {
    service.getConfig().subscribe({
      next: heroes => fail('expected an error, not heroes'),
      error: (error) => {expect(error.message).toEqual('Something went wrong. Please try again'); done()}
    });

    const req = httpTesting.expectOne('https://jsonplaceholder.typicodee.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush('Something went wrong. Please try again', {status: 404, statusText: 'Something went wrong. Please try again'});
  })
});

