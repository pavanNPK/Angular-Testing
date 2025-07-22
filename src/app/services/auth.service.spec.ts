import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {authInterceptor} from '../interceptors/auth.interceptor';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;
  let httpClient : HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
        provideHttpClient(withInterceptors([authInterceptor])),
        // this should be changed for class interceptor as of not is arrow function for class (withInterceptorsFromDi())

        provideHttpClientTesting()]
        // same here as above
        // provideHttpClientTesting({
          // provide: HTTP_INTERCEPTORS,
          // useClass: authInterceptor,
          // multi: true
        // })
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should check authentication token', () => {
    httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe();
    const req = httpTesting.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer ' + service.getAuthToken());
    httpTesting.verify();
    req.flush({});
  });
});
