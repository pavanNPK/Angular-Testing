import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {firstValueFrom} from 'rxjs';

// TestBed: Angular’s core testing utility for configuring and running tests in an Angular-like environment.
// BookService: The service you’re testing.
// provideHttpClient: Provides the real HttpClient for your tests.
// provideHttpClientTesting and HttpTestingController: These are used to mock HTTP requests in tests.
// firstValueFrom: Converts an Observable to a Promise for easier testing (especially with async/await).

describe('BookService', () => {
  let service: BookService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // we need to provide HttpClient and HttpTestingController for testing the HTTP requests
      // this is the environment for setup
      // provideHttpClient is used to configure the HttpClient. This is always before
      // provideHttpClientTesting is used to configure the HttpTestingController. For that, we need to import HttpTestingController
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    // injecting the dependencies. HttpTestingController is used to verify that the requests are made as expected
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
  });

  // describe('BookService', ...): Groups your tests and gives a readable output.
  // let service...: Declare variables for your service and HTTP mock controller.
  // beforeEach: Runs before each test to reset the testing module and inject fresh instances.
  // TestBed.configureTestingModule: Sets up the testing module, providing both the real HttpClient and the mock HttpTestingController.
  // httpTesting = TestBed.inject(HttpTestingController): Gets the mock HTTP controller to intercept and respond to requests.
  // service = TestBed.inject(BookService): Gets your actual service instance, with its dependencies (like HttpClient) injected.


  afterEach(() => {
    httpTesting.verify(); // this is to verify that the request is made. We are ensure that the request is made.
  });

  // httpTesting.verify(): Ensures that all expected HTTP requests were made during the test, and none were left hanging.
  // If you expect a request but don’t flush it, or if you flush more requests than expected, the test will fail here.
  // afterEach: Runs after every test (like a teardown).

  // this is the test case, it should make a get request called books. With async/await
  it('should make a get request called books', async () => {
    // 1. Call service method (this would trigger HttpClient.get)
    const book$ = service.getBooks();
    // 2. Convert Observable to Promise for easy awaiting
    const bookPromise = firstValueFrom(book$);
    // 3. Intercept the HTTP request to the expected URL
    const req = httpTesting.expectOne('https://fakerapi.it/api/v2/books');
    // 4. Optionally, verify the HTTP method (e.g., GET, POST)
    expect(req.request.method).toBe('GET');
    // 5. Prepare mock data
    const data = [{id: 1, title: 'book1', description: 'description1'}, {id: 2, title: 'book2', description: 'description2'}];
    // 6. Respond to the request with mock data
    req.flush(data);
    // 7. Await the result and assert it matches the mock data
    expect(await bookPromise).toEqual(data);

    // expect(await bookPromise).toEqual(data); // this is the expected response
    //httpTesting.verify(); // this is to verify that the request is made. We are ensure that the request is made.
    // we can do this in AfterEach. But we need to do this in each test. Instead of writing this in each test, we can write it in AfterEach
  });

  // service.getBooks(): Calls your service method, which internally uses HttpClient.get.
  // firstValueFrom(book$): Converts the Observable to a Promise so you can use await and make your test synchronous-style.
  // httpTesting.expectOne(...): Intercepts the HTTP request to the given URL, allowing you to control the response. If no request is made, the test fails.
  // expect(req.request.method).toBe('GET'): Verifies the HTTP method used (important for REST APIs).
  // req.flush(data): Responds to the intercepted request with your mock data. This is what HttpClient “sees” during the test.
  // expect(await bookPromise).toEqual(data): Asserts that the data returned by your service is exactly the mock data you provided. This proves your service correctly receives and exposes the API response.


});
