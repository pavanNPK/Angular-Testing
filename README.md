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
## Common Jasmine Matchers (besides toBe and toEqual)

| Matcher             | Purpose / Use Case                                                     | Example                                                          | Passes If...                                       |
| ------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| `toBe()`            | **Strict equality (`===`)** – same value and type                      | `expect(5).toBe(5)`                                              | The value and type are strictly equal              |
| `toEqual()`         | **Deep equality** – same structure and content (objects, arrays, etc.) | `expect({a: 1}).toEqual({a: 1})`                                 | The objects have the same structure and content    |
| `toBeTruthy()`      | Value is truthy (evaluates to true in boolean context)                 | `expect(1).toBeTruthy()`                                         | Value is not false, 0, null, undefined, '', or NaN |
| `toBeFalsy()`       | Value is falsy                                                         | `expect(0).toBeFalsy()`                                          | Value is false, 0, '', null, undefined, or NaN     |
| `toBeNull()`        | Value is exactly `null`                                                | `expect(null).toBeNull()`                                        | Only if the value is `null`                        |
| `toBeUndefined()`   | Value is exactly `undefined`                                           | `expect(undefined).toBeUndefined()`                              | Only if the value is `undefined`                   |
| `toBeDefined()`     | Value is **not** `undefined`                                           | `expect('abc').toBeDefined()`                                    | Any defined value (not `undefined`)                |
| `toBeNaN()`         | Value is `NaN`                                                         | `expect(NaN).toBeNaN()`                                          | Only if value is `NaN`                             |
| `toContain()`       | String contains substring, or array contains item                      | `expect('abc').toContain('a')`                                   | Substring exists in string or item exists in array |
| `toMatch()`         | String matches a regular expression                                    | `expect('hello').toMatch(/ell/)`                                 | Regex pattern matches the string                   |
| `toBeGreaterThan()` | Value is greater than expected                                         | `expect(10).toBeGreaterThan(5)`                                  | First value is greater than the second             |
| `toBeLessThan()`    | Value is less than expected                                            | `expect(3).toBeLessThan(5)`                                      | First value is less than the second                |
| `toThrow()`         | Function throws any error                                              | `expect(() => { throw 'err' }).toThrow()`                        | Any exception is thrown                            |
| `toThrowError()`    | Function throws a specific error or message                            | `expect(() => { throw new Error('fail') }).toThrowError('fail')` | Specific error or message is thrown                |


## usage

```angular181html
describe('Jasmine Matcher Examples', () => {

  it('should use toBe for strict equality', () => {
    expect(10).toBe(10);
    expect(true).toBe(true);
    expect('hi').toBe('hi');

    const a = {};
    const b = a;
    expect(a).toBe(b); // same reference
  });

  it('should use toEqual for deep equality', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
    expect({ name: 'John' }).toEqual({ name: 'John' });

    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(obj1).toEqual(obj2);
  });

  it('should use toBeTruthy and toBeFalsy', () => {
    expect(1).toBeTruthy();
    expect('hello').toBeTruthy();
    expect(true).toBeTruthy();

    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(false).toBeFalsy();
  });

  it('should use toBeNull, toBeUndefined, toBeDefined', () => {
    expect(null).toBeNull();

    let x;
    expect(x).toBeUndefined();

    let y = 5;
    expect(y).toBeDefined();
  });

  it('should use toBeNaN', () => {
    expect(NaN).toBeNaN();
  });

  it('should use toContain for arrays and strings', () => {
    expect([1, 2, 3]).toContain(2);
    expect('Angular').toContain('Ang');
  });

  it('should use toMatch with regex', () => {
    expect('hello world').toMatch(/world/);
    expect('2025-07-22').toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD
  });

  it('should use toBeGreaterThan and toBeLessThan', () => {
    expect(10).toBeGreaterThan(5);
    expect(3).toBeLessThan(5);
  });

  it('should use toThrow and toThrowError', () => {
    expect(() => { throw 'Error'; }).toThrow();

    expect(() => {
      throw new Error('Custom message');
    }).toThrowError('Custom message');
  });

});

```

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
#### Is Using Observable Mandatory?
> - In Angular, services that call HTTP APIs (like your getBooks() service) return Observables by default because Angular's HttpClient returns an Observable from all its HTTP methods (e.g., .get(), .post(), etc.).
> - This is not an arbitrary choice: Observables are the standard asynchronous data type in Angular for HTTP operations and are tightly integrated into the framework.

### Summary: Why Use HttpTestingController?

| Feature                   | Jasmine Spy (`jasmine.createSpyObj`) | `HttpTestingController`                |
| ------------------------- | ------------------------------------ | -------------------------------------- |
| Mocking HTTP requests     | Manual mocking (basic)               | Advanced control and inspection        |
| Verifying request details | ❌ Not directly                       | ✅ Can check URL, method, headers, etc. |
| Simulating responses      | ✅ Yes (via `of()` or `throwError()`) | ✅ Yes (via `flush()`, `error()`, etc.) |
| Best for Angular services | ⚠️ Okay for simple logic             | ✅ Preferred and recommended by Angular |
| Built-in Angular support  | ❌ No                                 | ✅ Yes                                  |


#### firstValueFrom

```angular181html
import { firstValueFrom } from 'rxjs';
```
> - `firstValueFrom` in RxJS is a utility function used to convert an Observable into a Promise. It is specifically designed to resolve the Promise with the first value emitted by the Observable, and then immediately unsubscribe from the Observable.

#### Key Concepts Explained

* Which is for book service explanation.

##### Why Mock HTTP?
In unit tests, you never call real APIs. Instead, you intercept requests and respond with controlled data. This makes tests fast, reliable, and independent of external services.

##### HttpTestingController
> - Intercepts HTTP requests made by HttpClient.
> - expectOne(url): Waits for exactly one request to the specified URL.
> - flush(data): Responds to the intercepted request with the provided data.

##### firstValueFrom
> - Converts an Observable to a Promise.
> - Returns the first value emitted by the Observable, and then immediately unsubscribes from the Observable.
> - so you can use async/await for cleaner test logic. This is especially useful when you don’t care about multiple emissions, just the first value.

##### Testing Flow
```angular181html
1. Service method runs (e.g., getBooks()), which tries to make an HTTP request.
2. HttpTestingController intercepts that request (no real HTTP happens).

3. You flush mock data into the request. req.flush(data) is used to simulate a backend response to an HTTP request in a test. It "flushes" a fake response to the request you’re testing. in simple terms, you respond to the request with mock data.

4. Your service receives this mock data as if it came from the real API.
5. You assert that what the service returns matches your expectations.
```

# Angular HTTP API Testing: Pin-Point Summary Table

This table explains each major concept and line used in Angular HTTP API service testing with `HttpClientTestingModule` and `HttpTestingController`.

| Name/Line/Concept                   | What It Does                                             | Why It's Needed                                   |
|-------------------------------------|----------------------------------------------------------|---------------------------------------------------|
| **TestBed.configureTestingModule**  | Sets up a test environment for Angular services          | Lets you inject services & mock HTTP              |
| **provideHttpClient()**             | Provides `HttpClient` to the TestBed environment        | Required for services that use `HttpClient`       |
| **provideHttpClientTesting()**      | Provides `HttpTestingController` for mocking HTTP       | Lets you intercept and control HTTP requests      |
| **beforeEach**                      | Runs setup code before each test (test isolation)        | Resets the environment for each test case         |
| **httpTesting = TestBed.inject(HttpTestingController)** | Gets the mock HTTP controller                           | Used to intercept and respond to HTTP requests    |
| **service = TestBed.inject(BookService)** | Gets the service under test                            | Lets you test your actual service logic            |
| **afterEach**                       | Runs cleanup after each test                              | Cleans up and verifies no unmatched requests      |
| **httpTesting.verify()**            | Verifies all expected HTTP requests were made            | Fails the test if requests were left unmatched    |
| **service.getBooks()**              | Calls the service method (triggers `HttpClient.get`)     | Starts the HTTP request you want to test          |
| **firstValueFrom(book$)**           | Converts Observable to Promise                           | Simplifies async/await testing                    |
| **httpTesting.expectOne(url)**      | Intercepts the HTTP request to the specified URL         | Prevents real HTTP and lets you control the response |
| **expect(req.request.method).toBe('GET')** | Asserts the HTTP method used                         | Ensures correct REST API usage                     |
| **req.flush(data)**                 | Responds to the intercepted request with mock data       | Lets you simulate an API response                  |
| **await bookPromise**               | Waits for the service's Promise to resolve               | Lets you assert on the result synchronously        |
| **expect(await bookPromise).toEqual(data)** | Asserts the service returns expected data           | Proves your service handles the API response       |


| Item                       | Type              | Purpose                         | Environment  |
| -------------------------- | ----------------- | ------------------------------- | ------------ |
| `provideHttpClient`        | Provider          | Enables real HTTP communication | App runtime  |
| `provideHttpClientTesting` | Provider          | Mocks HTTP for testing          | Unit testing |
| `HttpTestingController`    | Service/Test Tool | Controls HTTP requests in tests | Unit testing |


## Key Takeaways

- **Never call real APIs** in unit tests—always mock with `HttpTestingController`.
- **Always verify** no unmatched requests with `httpTesting.verify()`.
- **Convert Observables to Promises** (`firstValueFrom`) for clean async/await.
- **Intercept** requests with `expectOne(url)` and **respond** with `flush(data)`.
- **Test edge cases** (errors, empty responses) by flushing appropriate data.
- **If you want to see data in your app** (not tests), you must `subscribe` in a component (not `ngOnInit`).
- **If you want to see data in tests**, `console.log(await bookPromise)`.

---

### We can handle multip requests in a single test.

> - Handling more than one request in a single test is often useful when you want to test the interaction between multiple components, services, or other parts of your application. Here's how you can do it:
> - In tests, if you expect multiple requests with the same criteria(GET req), you can use match() API instead of expectOne().
> - match(): returns an array of intercepted requests that match the specified criteria.
> - After calling match(), the req are removed from the queue, so you can use them to respond to the requests.
> - You can use req.flush() to respond to each request in the array.
> - You manually handle flushing and verifying the requests.
> - 
> - For the please refer to the multi-req.service.spec.ts
> - In previous example we're done with the promise, refer to book.service.spec.ts
> - Now we are doing subscribe, refer to multi-req.service.spec.ts

### exceptOne() vs exceptNone()

> - In Angular, expectOne and expectNone are methods of the HttpTestingController service, used for unit testing HTTP requests made by HttpClient. These methods allow you to assert expectations about the number of HTTP requests that match specific criteria.

> `expectOne` - expectOne is used to assert that exactly one HTTP request matching the provided criteria has been made.
> ##### Usage
> - You provide a URL, a RequestMatch object, or a predicate function to define the criteria.
> ##### Behavior
> - If a single request matches, expectOne returns a TestRequest object, which you can then use to flush a mock response or simulate an error.
> - If no matching requests are found, or if more than one matching request is found, expectOne throws an error, causing the test to fail.
> ```angular181html
> const req = httpTestingController.expectOne('/api/data');
> req.flush({ message: 'Data received' });
>```
> 
> ```angular181html
> it('should call HTTP request called ones with a non null body', () => {
>    httpClient.post('https://jsonplaceholder.typicode.com/posts',
>      { userId: 198, id: 198, title: 'Except one', body: '"Except one" means "with the exception of one" or "excluding one". It signifies that all members of a group or category are included, except for one specific individual or instance. For example, "All the students passed the exam except one" means that all students except one student passed the exam.'}
>    ).subscribe();
>    const req = httpTesting.expectOne((request) => request.body !== null);
>    expect(req.request.method).toBe('POST');
>    expect(req.request.body).toEqual({
>      userId: 198,
>      id: 198,
>      title: 'Except one',
>      body: '"Except one" means "with the exception of one" or "excluding one". It signifies that all members of a group or category are included, except for one specific individual or instance. For example, "All the students passed the exam except one" means that all students except one student passed the exam.'})
> })
> ```


>  `expectNone` - expectNone is used to assert that no HTTP requests matching the provided criteria have been made.
> ##### Usage
> - Similar to expectOne, you provide a URL, a RequestMatch object, or a predicate function.
> ##### Behavior
> - If no matching requests are found, the assertion passes.
> - If one or more matching requests are found, expectNone throws an error, causing the test to fail.

> ```angular181html
> httpTestingController.expectNone('/api/unwanted-call');
>```
>
> ```angular181html 
>  it('should assert that no HTTP requests have been made', () => {
>    httpClient.get('https://jsonplaceholder.typicode.com/posts/198').subscribe();
>    const request = httpTesting.expectOne('https://jsonplaceholder.typicode.com/posts/198');
>    httpTesting.expectNone((request) => request.method !== 'GET');
>    expect(request.request.method).toBe('GET');
> });
> ```

### We can Handle Errors from the server response along with network errors

```angular181html
import {catchError, throwError} from 'rxjs';
```
> - `catchError` is used to handle errors in the observable stream.
> - `throwError` creates an observable that emits an error.

```angular181html
getConfig() {
  return this.http.get('https://jsonplaceholder.typicodee.com/posts').pipe(
    catchError(err => {
      console.log("While calling config service", err);
      return throwError(() => new Error('Failed to fetch config'));
    })
  )
}
```
 #### What’s happening here?
> - `getConfig()` makes an HTTP GET request to a fake API (note: there's a typo in the domain name: typicodee instead of typicode, which is intentional to simulate an error).
> - If the request fails, `catchError()` is triggered:
>  - Logs the error.
>  - Returns an observable error using throwError() with a custom message.
> - So, you gracefully handle failures instead of crashing the app.

```angular181html
it('should handle error response correctly', () => {
  const errorResponse = {
    status: 404,
    statusText: 'Not Found'
  };
  service.getConfig().subscribe({
    next: heroes => fail('expected an error, not heroes'),
    error: error => expect(error.message).toBe('Failed to fetch config')
  });
  const req = httpTesting.expectOne('https://jsonplaceholder.typicodee.com/posts');
  expect(req.request.method).toBe('GET');
  req.flush('Failed to fetch config', errorResponse);
});

```

#### What’s happening here?
> - Calls `getConfig()`, which triggers the HTTP request.
> - `next`: If the request unexpectedly succeeds, the test fails (`fail()`).
> - `error`: If the service throws an error, it checks that the message matches what you threw earlier
> - const req = httpTesting.expectOne('https://jsonplaceholder.typicodee.com/posts');
> - Ensures it was a GET request.
> - Simulates sending the fake error response to the request. flush() triggers the observable with a failure.

#### Summary: What Did You Achieve?

> You created a unit test for an Angular service that
> - Makes an HTTP request.
> - Handles errors using catchError.
> - You simulated a failure using HttpTestingController.
> - You asserted that the service handles the error gracefully and returns a proper custom error.


### We are doing the AUTH service testing
Simply created on service of auth service. And next one is we created the interceptor for the auth service.

```angular181html
getAuthToken() {
    return 'mockToken';
}
```

```angular181html
import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
let service = inject(AuthService)
  let token = service.getAuthToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};

```
Later we created the spec file for the auth service.

```angular181html
describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;
  let httpClient : HttpClient;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [AuthService, provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });
  
  it('should check authentication token', () => {
  httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe();
  const req = httpTesting.expectOne('https://jsonplaceholder.typicode.com/posts');
  expect(req.request.headers.get('Authorization')).toEqual(service.getAuthToken());
  httpTesting.verify();
  req.flush({});
  });
});
```
> - Uses provideHttpClient(withInterceptors([...])) to configure HttpClient with the custom authInterceptor.
> - Uses provideHttpClientTesting() to replace real HTTP calls with a mock controller that intercepts them for testing.
> - Registers AuthService so it can be injected.
> - Services and Testing Utilities Injection
>  - service = TestBed.inject(AuthService);
>  - httpTesting = TestBed.inject(HttpTestingController);
>  - httpClient = TestBed.inject(HttpClient);
>  - `service`: An instance of AuthService under test.
>  - `httpTesting`: A mock controller to test and verify HTTP requests.
>  - `httpClient`: The HttpClient instance that we will use to send requests.

```angular181html
httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe();

>  Sends a GET request using Angular's HttpClient. Since authInterceptor is attached, we expect it to add the Authorization header.

const req = httpTesting.expectOne('https://jsonplaceholder.typicode.com/posts');

> Captures the outgoing request.
> Ensures exactly one request was made to that URL.
> Returns a handle to that request as req.

expect(req.request.headers.get('Authorization')).toEqual(service.getAuthToken());

> Fetches the value of the Authorization header from the request.
> Compares it with the token returned by service.getAuthToken().
> Ensures the token was correctly added to the request.

req.flush({});

> Simulates the response from the server.
> Flushes the request with an empty response.

httpTesting.verify();

> Confirms no unexpected HTTP calls were made.
```

### Summary: What Did You Achieve?

| Part                             | Purpose                                              |
| -------------------------------- | ---------------------------------------------------- |
| `TestBed.configureTestingModule` | Set up mock Angular testing environment              |
| `AuthService`                    | The service being tested                             |
| `authInterceptor`                | Interceptor that adds auth headers                   |
| `HttpClientTestingController`    | Used to mock and verify HTTP requests                |
| `httpClient.get(...)`            | Sends a fake HTTP request                            |
| `expectOne(...)`                 | Verifies that the correct request was made           |
| `headers.get('Authorization')`   | Checks if the auth header was set by the interceptor |
| `req.flush({})`                  | Simulates HTTP response                              |
| `httpTesting.verify()`           | Ensures no unexpected HTTP calls happened            |


### Do the testng with component

Types of component testing.
1. Class Testing(Without DOM).
> - You can test the component's ts class in isolation. This approach.
> - Focuses on the business logic and state management of the component. It doesn't involve the DOM.
> - Skips any interaction with the browser or other external dependencies (Template)

2. DOM Testing (With DOM).
> - This involves testing the template and its integration with the component's logic.
> - You need to render the component in the DOM and interact with it.
> - Verify if the HTML updated correctly based on the component's state.
> - Check that user interactions trigger the expected behavior.
> - Focuses on the visual and user experience of the component.

### Why do we need DOM testing?
> - A component is more than its a class logic.
> - It needs to be rendered in the DOM to be tested.
> - It needs to be interacted with to test user interactions and behavior.
> - Example: A button that triggers an event when clicked.
> - It's important to test the component's behavior in the context of the DOM, not just its class logic.

```angular181html
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

> This is a simple example of how to test a component with the DOM.
> #### What's Happening:
> - You're importing testing utilities from Angular's testing package.
> - `TestBed`: Main utility to configure and initialize the testing environment for components and services
> - `ComponentFixture` : A wrapper around the component instance that gives access to:
>    - The component instance (component)
>    - Its template
>    - `fixture.detectChanges()`: Triggers change detection to update the view- 
> ---- 
> - You're importing the component that you're going to test: `BannerComponent`.
> - `describe()` is a Jasmine test suite function. It groups related tests.
> - '`BannerComponent`' is just a label/description.
> - This function wraps a group of test specs (it() blocks) related to BannerComponent.
> ----
> - These are variables declared outside the test functions but inside the test suite so they are accessible across multiple tests.
> - `component`: Will hold the actual instance of BannerComponent.
> - `fixture`: Will hold the ComponentFixture which manages the component and gives access to the DOM and lifecycle methods.
> ----
> - `beforeEach()` runs before each test in the describe() block.
> - The `async` keyword ensures that we can wait for `async` tasks like compiling components.
> Useful when initializing modules, setting up configurations, or simulating component creation.
> ----
> - ` TestBed.configureTestingModule()`: Sets up the testing environment.
> - You're specifying that you want to test the BannerComponent by importing it.
>  - Note: In Angular 14+, you can directly import standalone components like this.
> - `compileComponents`() compiles all the components' templates and CSS. It's async because Angular compiles templates behind the scenes
>  - Without this, the test won't have access to the component's DOM or change detection.
> ----
> - Creates an instance of the component and fixture.
> - TestBed.createComponent(...) returns a ComponentFixture.
> - This simulates what Angular normally does during app execution.
> ----
> `component = fixture.componentInstance;`
> - You're extracting the actual component class (BannerComponent) from the fixture.
> - Now you can call its methods or check its properties in your tests.
> ----
> `fixture.detectChanges();`
> - This manually triggers Angular’s change detection, which:
>   - Processes data bindings
>   - Calls ngOnInit()
>   - Renders the DOM
> - Without this, the component’s view won't update or initialize properly in tests.

### Why do we need class testing?

| Concept                    | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `TestBed`                  | Sets up a test module to mimic Angular's behavior.             |
| `ComponentFixture`         | Allows interaction with the component and its DOM.             |
| `beforeEach()`             | Prepares a fresh test environment for each test.               |
| `detectChanges()`          | Initializes and syncs the component’s template with the model. |
| `expect(...).toBeTruthy()` | Verifies that the component was created successfully.          |


```angular181html
it ('should contain the banner element', () => {
  const bannerElement: HTMLElement = fixture.nativeElement; // Get the DOM element which is the root of the component
  console.log(bannerElement, '...................');
  expect(bannerElement.textContent).toContain('banner works' );
})
```
> - fixture.nativeElement returns the root DOM element of the component.
>   - Think of it as the actual HTML element that Angular created from your component.
> - You're assigning it to bannerElement for easier access.
> - Type annotation HTMLElement is used for clarity and better IntelliSense in TypeScript.
> This allows you to directly inspect the DOM output of your component.
> ----
> `expect(bannerElement.textContent).toContain('banner works');`
>  - This is the actual test assertion
>  - bannerElement.textContent grabs all the visible text inside the component's root element
>  - .toContain('banner works') checks whether the component renders text that includes "banner works".
>  - This passes if the component's template contains that phrase (e.g., from a line like `<p>banner works!</p>`).
> ----
> `const p = bannerElement.querySelector('p');`
> 
> `expect(p.textContent).toContain('banner works');`
> - We can also query for specific elements using the querySelector method.
> - This allows you to target elements within the component's template.

| Practice                                      | Reason                                                        |
| --------------------------------------------- | ------------------------------------------------------------- |
| Use `fixture.nativeElement`                   | Direct access to rendered HTML; good for DOM-based assertions |
| Test for visible text                         | Simulates what the user would see                             |
| Use `toContain()` with `textContent`          | Flexible and simple way to verify text existence              |
| Avoid relying on full strings (unless strict) | Makes tests more robust against small text changes            |

### What is Debug element?
`DebugElement is part of Angular's @angular/core testing utilities.`
> It wraps around the native DOM element (HTMLElement) and adds Angular-specific capabilities, such as:

| Capability                          | Description                                            |
| ----------------------------------- | ------------------------------------------------------ |
| `nativeElement`                     | Access the raw DOM node (like `fixture.nativeElement`) |
| `query(By.css('.class'))`           | Query child elements using CSS selectors               |
| `triggerEventHandler('click', ...)` | Simulate user events                                   |
| `componentInstance`                 | Get the instance of a child component                  |
| `attributes`, `classes`, `styles`   | Inspect element state                                  |

#### How to Use DebugElement

```angular181html
<div class="banner" (click)="onClick()">banner works!</div>
```
```angular181html
export class BannerComponent {
  clicked = false;
  onClick() {
    this.clicked = true;
  }
}
```
```angular181html
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugEl = fixture.debugElement; // gets the root DebugElement
  });

  it ('should contain the banner element', () => {
    const bannerElement: HTMLElement = fixture.nativeElement; // Get the DOM element which is the root of the component
    console.log(bannerElement, '...................');
    expect(bannerElement.textContent).toContain('banner works' );
  })

  it('should handle click event', () => {
    const bannerElement: HTMLElement = debugEl.nativeElement; );
    const button = bannerElement.querySelector('button');
        button.click();
        expect(component.clicked).toBe(true);
      });
}); 
```

#### Summary of `DebugElement` vs `nativeElement`

| Feature                      | `DebugElement`                          | `nativeElement`                     |
| ---------------------------- | --------------------------------------- | ----------------------------------- |
| Angular-specific querying    | ✅ Supports `By.css()`, `By.directive()` | ❌ No querying abilities             |
| Trigger Angular events       | ✅ `triggerEventHandler()`               | ❌ Must use native JS event dispatch |
| Get child component instance | ✅ `componentInstance`                   | ❌ Not available                     |
| Best for Angular unit tests  | ✅ Yes                                   | ⚠️ Limited use                      |


#### When to Use DebugElement?
> - You want to test Angular behavior, like event binding
> - You need to query child elements/components
> - You want to inspect or simulate interactions
> - You care about directives or Angular's rendering logic
> ----
> - Use `nativeElement` when:
> - You just want to check the plain DOM or text
> - You're validating raw rendered HTML

```angular181html
it ('should contain the banner element', () => {
  const bannerElement: HTMLElement = fixture.nativeElement; // Get the DOM element which is the root of the component
  console.log(bannerElement, '...................');
  expect(bannerElement.textContent).toContain('banner works' );
})

// when we are testing the component in the browser
it ('should contain the banner element with the debug element', () => {
  const debugElement = fixture.debugElement;
  const bannerElement: HTMLElement = debugElement.nativeElement;
  const p = bannerElement.querySelector('p')!; //  works in browser environment
  console.log(p, '...................');
  expect(p.textContent).toContain('banner works' );
})

// works on all platforms slightly more complex. on other platforms we need to use this
it ('should contain the banner element with the more platform independent', () => { // this approach is more platform independent. works on all platforms
  const debugElement = fixture.debugElement;
  const paraDebugE = debugElement.query(By.css('p')); // to help select the element
  const p: HTMLElement = paraDebugE.nativeElement; //after debug we are unwrapping the element
  console.log(p, '...................');
  expect(p.textContent).toContain('banner works' );
})
```

### Change detection

> - Angular uses change detection to detect changes in the DOM and update the view
> - Change detection is a key part of Angular's architecture
> - Change detection is a process that Angular uses to detect changes in the application's state and update the view accordingly
> - When write tests, we can use `fixture.detectChanges()` to manually trigger change detection and update the view
> ----
> Automated change detection:
> - Instead of calling `fixture.detectChanges()`, you can use `componentFixtureAutoDetect`
> - ` providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]`


### For input and output testing with FormsModule

```angular181html
<input type="text" [(ngModel)]="userName" (input)="transform()">
<span>{{ userName }}</span>
```

```angular181html
userName: string = '';

transform() {
    this.userName = this.userName.toUpperCase();
}
```

```angular181html
it('should convert userName to uppercase', () => {
  // component.userName = 'test';
  // component.transform();
  // expect(component.userName).toBe('TEST');
  const nameElement = fixture.nativeElement.querySelector('input');
  const nameDisplay = fixture.nativeElement.querySelector('span');
  nameElement.value = 'test';
  nameElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  expect(nameDisplay.textContent).toBe('TEST');
})
```
