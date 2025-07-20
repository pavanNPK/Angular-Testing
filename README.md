# Angular Testing with Jasmine and Karma

This `README` explains the basics of Angular testing using `Jasmine and Karma`, focusing on testing Angular services with examples.  It covers key Jasmine concepts like describe, it, beforeEach, how and when to use them, the purpose of testing, and mocking techniques for dependent services and more.

Goal is to provide a solid understanding of Angular testing and its importance in ensuring the quality and reliability of your application.
Angular CLI install automatically includes `Jasmine` and `Karma` for unit and end-to-end testing.

When testing the application that make HTTP requests, you need to import the `HttpClientTestingModule` from `@angular/common/http/testing` in your test module.
```angular181html
import { HttpClientTestingModule } from '@angular/common/http/testing';
```
It simulates the HttpClient behavior in tests, allowing you to test components that use the HttpClient without making real HTTP requests.
Mock responses to emulate backend behavior, including errors or delays.

Verify no unexpected requests are made during testing. After all responses are flushed, test confirm that no extra or unintended requests were made.

##### Setup for testing
> - provideHttpClient(): Configure Angular's HttpClient in your test.
> - provideHttpClientTesting(): Replace the real HttpClient with a mock HttpClient for testing (HttpClientTestingController).
> - Always `provideHttpClient` before `provideHttpClientTesting()`. Because, methods not be overridden.

> #### Two types of tests:
> - Isolated tests
>- Integration tests

### Isolated tests

Single unit test for a single component, directive, or service. That type of test is not dependent on anything those types of methods.

### Integration tests

Multiple unit tests for multiple components, directives, and services. Mean's combine more than one.
Ex-: Component ( View - Model - View )

> ####  types of testing in general:
> - Unit testing
> - Integration testing / Functional ( Deep, Shallow )
> - End-to-end testing

### Unit Testing

Unit tests are the core of Angular testing. They test individual functions and components in isolation.
Ex-: A component with a single function is tested as unit test. ( JS Class / Function - Particular Code )

### Integration Testing

Integration tests are tests that test the interaction between multiple components, directives, and services.
Ex-: Two components ( View - Model - View )

In simple terms more than unit testing but less than complete app.
Comes btw unit - E2E testing.

We will take more than one unit support. will not take whole app -> One part of app is working with others


### End-to-End Testing

End-to-end tests are tests that simulate a real user interaction with the application.
Ex-: A user navigates to a page, clicks a button, and then sees a specific result.

In simple terms test against a live server running application. This generally done through automatically web browser.
To manipulate the browser to automate way. to check weather the app is working or not. Less reliable (Trust) than unit and integration testing.

----------

### Isolated Testing

Isolated test can be tested with pipes, services, class, component, directive, etc.
We don't test the template parts for a component. Only test the logic part.

### Integration Testing

> Two types we have:
> - Deep Integration Testing
> - Shallow Integration Testing
> #### Deep Integration Testing
> - We may test any comp at a time ( Both Parent and child or diff comp)
> - It's dependent on each other
> #### Shallow Integration Testing
> - We may test only single comp at a time with it's temp
> - It's not dependent. Must be free.


### Types of Mocks
> 3 types of mocks:
> - Dummies
> - Spies
> - Stubs
> #### Dummies
> - Dummy is a fake object that imitates the real object. ( Class / Object )
> #### Spies
> - It'll control the behavior.
> #### Stubs
> - How may times called.

## When and How to Use These Jasmine Methods

| **Concept**             | **What it does**                                                                                 | **Typical Usage Example**                                                       | **Notes**                                                                                    |
|-------------------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **describe**            | Groups related tests into a suite (specification).                                               | `describe('Service', () => { ... });`                                         | Suites can be nested for organization.                                                        |
| **it**                  | Defines an individual test case (spec).                                                          | `it('should return true', () => { ... });`                                    | Describes a specific behavior to verify.                                                      |
| **expect**              | Makes assertions about values in your code.                                                      | `expect(result).toBe(true);`                                                  | Used inside `it` blocks.                                                                      |
| **matchers**            | Methods chained to `expect()` to compare values.                                                 | `expect(result).toEqual(42);`                                                 | Common matchers: `toBe`, `toEqual`, `toContain`, `toBeTruthy`, `toBeNull`, `toThrow`, etc.    |
| **beforeEach**          | Runs code before each test within a suite (setup).                                               | `beforeEach(() => { service = new MyService(); });`                           | Useful for resetting state or creating test doubles.                                           |
| **afterEach**           | Runs code after each test within a suite (teardown).                                             | `afterEach(() => { service = null; });`                                       | Good for cleanup.                                                                             |
| **beforeAll**           | Runs code once before all tests in a suite (global setup).                                       | `beforeAll(() => { setupDatabase(); });`                                      | For expensive setup only needed once.                                                         |
| **afterAll**            | Runs code once after all tests in a suite (global teardown).                                     | `afterAll(() => { cleanupDatabase(); });`                                     | For cleanup after the suite.                                                                  |
| **spyOn**               | Watches and optionally replaces the behavior of existing functions or methods (spies).           | `spyOn(fakeService, 'getValue').and.returnValue(9);`                          | Used to isolate code under test by controlling dependencies.                                  |
| **jasmine.createSpy**   | Creates a standalone function to spy on.                                                         | `const spy = jasmine.createSpy('mySpy');`                                     | For when the function doesn’t exist yet.                                                      |
| **jasmine.createSpyObj**| Creates an object with multiple spy functions.                                                   | `const fakeUser = jasmine.createSpyObj('User', ['save', 'delete']);`          | Useful for mocking complex objects.                                                           |
| **done**                | Signals completion of asynchronous tests (callback style).                                       | `it('calls async', done => { setTimeout(() => { expect(true).toBe(true); done(); }, 100); });` | Required for Jasmine to know when async code is complete.                                     |
| **async/await**         | Modern way to handle asynchronous code in tests.                                                 | `it('uses async', async () => { await someAsyncCall(); ... });`               | Preferred over `done` in modern code.                                                         |
| **fit/fdescribe**       | Focuses only on these tests or suites during a run.                                              | `fdescribe('Only this suite', () => { ... });`                                | Handy for debugging.                                                                          |
| **xit/xdescribe**       | Excludes these tests or suites during a run.                                                     | `xdescribe('Skipped suite', () => { ... });`                                  | For temporarily disabling tests.                                                              |
| **custom matcher**      | Extends Jasmine with your own comparison logic.                                                  | Define your own matcher with `jasmine.addMatchers(...);`                      | For domain-specific assertions.                                                               |
| **jasmine.clock**       | Controls time-based functions (`setTimeout`, `setInterval`).                                     | `beforeEach(() => { jasmine.clock().install(); });`<br>`afterEach(() => { jasmine.clock().uninstall(); });` | For testing code that depends on timing.                                                      |
| **fakes/mocks**         | Objects or classes that simulate real dependencies for isolated testing.                         | `class FakeService { ... }`                                                   | Helpful for testing components that depend on services, APIs, or databases.                   |


## What is Angular TestBed?

`TestBed` is Angular's primary API for writing unit tests, especially for testing components, services, directives, pipes, etc., within the Angular testing ecosystem.
It provides a simulated Angular environment for testing — allowing you to create components and services as Angular would instantiate them, manage dependency injection (DI) automatically, configure testing modules that mirror your real Angular modules, and handle lifecycle hooks.

### Why & When to Use TestBed?
> - `For Angular features involving dependency injection`: When your service or component depends on Angular DI (injecting other services, tokens).
> - `When you want to test code in an Angular context` (i.e., with Angular's DI, lifecycle hooks, templates, etc.).
> - `When testing components or directives` because they require Angular's compilation and rendering context.
> - `When your service relies on other injected services` and you want Angular to resolve those dependencies automatically.
> - `To configure testing modules` with providers, declarations, imports, etc.

### How to Use TestBed
```angular181html
TestBed.configureTestingModule({
  imports: [...],        // any Angular modules your service/component needs
  declarations: [...],   // components, directives, pipes you want to use
  providers: [...]       // services you want to inject (or mocks)
});
const service = TestBed.inject(ValueService); // Angular creates instance with DI

// This creates a test module with the specified configuration, and TestBed.inject() resolves dependencies similarly to how Angular’s DI works at runtime.
```

> First i created a two services ( master and value ) with the help of `ng g s master` and `ng g s value` command.
> And then without using TestBed, i created a test file in the same folder and i wrote the below code to test the master service and value service.
> // i'm commenting this part because i'm using TestBed now

> Now i used `TestBed` to configure a test module with the specified configuration, and `TestBed.inject()` resolves dependencies similarly to how Angular's DI works at runtime.
> We are used the spy object in master service to mock the value service.
```angular181html
// the spy object is an object that imitates the real object. It also has spy methods.
// The main purpose of the spy object is to control the behavior of the object.
// in this case, we are creating a spy object for the value service.
// the syntax means we are creating a spy object with the name 'ValueService'
// and it has one method 'getValue' which is also a spy.

let masterService: MasterService;
let valueService: SpyObj<ValueService>;
  
// here we are created the mock object for the value service
const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);

// here we are creating a test module with the specified configuration, and TestBed.inject() resolves dependencies similarly to how Angular's DI works at runtime.
TestBed.configureTestingModule({
  providers: [MasterService, { provide: ValueService, useValue: valueServiceSpy }]
});

masterService = TestBed.inject(MasterService);
valueService = TestBed.inject(ValueService) as SpyObj<ValueService>;
```
### Later work with the http service data

> ##### Overview: Why Are We Writing This Test?
> - We are testing a service called HeroService which uses Angular's HttpClient to fetch a list of heroes. 
> - Instead of making real HTTP requests, we mock (fake) the HttpClient using Jasmine spies so that our tests are fast, reliable, and don't depend on an actual backend.
> ##### We want to verify:
> - he correct data is returned when the request succeeds.
> - The service handles errors correctly when the request fails.
> - The HTTP method is called the expected number of times.

### Code Walkthrough with Explanation
```angular181html
import { HeroService } from './hero.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
```

> ##### What this does:
> - `HeroService`: The service we are testing.
> - `HttpClient`: The Angular service used to make HTTP requests.
> - `HttpErrorResponse`: Used to simulate HTTP error responses.
> - `of()`: Creates a stream of observable data (simulated success).
> - `throwError()`: Creates a stream that emits an error (simulated failure).

```angular181html
describe('HeroService', () => {})
```
> - Jasmine's `describe` is a test suite. It groups related tests together for HeroService.
> - The callback function is where you define the tests for the service.

```angular181html
  let service: HeroService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
```

> - `service`: Will hold our actual HeroService instance.
> - `httpClientSpy`: A spy object that mocks HttpClient. It replaces the real HTTP calls with fake ones we can control and inspect.

```angular181html
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HeroService(httpClientSpy);
  });
```

> - `beforeEach`: Runs before each test.
> - `createSpyObj`: Creates a fake object named 'HttpClient' with one method: 'get'.
> - `HeroService(httpClientSpy)`: Injects the fake HttpClient into the service. This avoids making real HTTP requests.

```angular181html
  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
```

> - `it`: Defines a test case.
> - `(done: DoneFn)`: An Angular callback function that is called when the test is complete.
> - `DoneFn`: Used to handle asynchronous testing. We call done() when the async operation finishes.
> - After that `expectedHeroes` dummy data is created. It is an array of objects with id and name properties.

```angular181html
httpClientSpy.get.and.returnValue(of(expectedHeroes));
```
>- Tells the fake HttpClient.get() to return an observable of expectedHeroes.
>- This simulates a successful API call.

```angular181html
service.getHeroes().subscribe({
  next: heroes => {
    expect(heroes).withContext('expected heroes').toEqual(expectedHeroes);
    done();
  },
  error: done.fail
});
```

> - Calls the service method and subscribes to the observable it returns.
> - On success (next), it checks if the heroes match expectedHeroes.
> - If it errors (error), the test fails.
> -done() signals the test is complete.

```angular181html
expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
```
> - Checks that the get() method of the HttpClient was called exactly once.
> - Ensures the service isn't making multiple or incorrect calls.

```angular181html
  it('should return error when HttpClient returns error 404', (done: DoneFn) => {
```
> - Tests how the service handles an HTTP error (404 Not Found).

```angular181html
const errorResponse = new HttpErrorResponse({
  error: '404 not error',
  status: 404,
  statusText: 'Not Found'
});
```
> - Creates a mock error to simulate a 404 response.

```angular181html
httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
```
> - Tells the fake HttpClient.get() to return an observable that emits an error.
>- This simulates a failed API call.

```angular181html
service.getHeroes().subscribe({
  next: heroes => done.fail('expected an error, not heroes'),
  error: error => {
    expect(error.message).toContain('404 Not Found');
    done();
  }
});
```
> - Calls the service method and subscribes to the observable it returns.
> - On success (next), the test fails.
> - On error, it checks if the error message contains '404 Not Found'.
> - done() signals the test is complete.

### Summary: Why We Do This

| Feature/Test Code                         | Why It's Used                                   |
| ----------------------------------------- | ----------------------------------------------- |
| `jasmine.createSpyObj`                    | To fake `HttpClient` and track method calls     |
| `of()`                                    | Simulates a successful HTTP response            |
| `throwError()`                            | Simulates an HTTP error response                |
| `subscribe()` in tests                    | Observes the result of `getHeroes()`            |
| `expect().toEqual()`                      | Validates the returned data                     |
| `expect(httpClientSpy.get.calls.count())` | Ensures correct number of HTTP calls            |
| `done()` / `done.fail()`                  | Manages async tests, marking success or failure |

```angular181html
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });

  const httpTesting = TestBed.inject(HttpTestingController);
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  heroService = new HeroService(httpClientSpy);
});
```

> - `TestBed` is Angular's primary API for writing unit tests. It allows you to set up a testing environment just like a mini Angular app.
> - `configureTestingModule()` sets up a testing module (similar to @NgModule) that provides services/components for testing.

```angular181html
providers: [provideHttpClient(), provideHttpClientTesting()]
```
> - `provideHttpClient()`: Registers the normal HttpClient service for testing.
> - `provideHttpClientTesting()`: Replaces the default HTTP backend with the Ht
> - This avoids real HTTP request. You can test exactly what request is made, its method, URL, and simulate responses.

```angular181html
const httpTesting = TestBed.inject(HttpTestingController);
```
> - Injects the `HttpTestingController`, which lets you monitor, expect, and flush HTTP requests in your tests.
> ##### It gives you full control to:
> - Expect a specific HTTP call was made.
> - Simulate a response or error.
> - Verify no unexpected HTTP calls were made
##### Example Usage
```angular181html
const req = httpTesting.expectOne('api/heroes');
expect(req.request.method).toBe('GET');
req.flush(expectedHeroes);
httpTesting.verify();
```

### Summary: Why Use HttpTestingController?

| Feature                   | Jasmine Spy (`jasmine.createSpyObj`) | `HttpTestingController`                |
| ------------------------- | ------------------------------------ | -------------------------------------- |
| Mocking HTTP requests     | Manual mocking (basic)               | Advanced control and inspection        |
| Verifying request details | ❌ Not directly                       | ✅ Can check URL, method, headers, etc. |
| Simulating responses      | ✅ Yes (via `of()` or `throwError()`) | ✅ Yes (via `flush()`, `error()`, etc.) |
| Best for Angular services | ⚠️ Okay for simple logic             | ✅ Preferred and recommended by Angular |
| Built-in Angular support  | ❌ No                                 | ✅ Yes                                  |

