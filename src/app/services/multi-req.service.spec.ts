import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';

describe('HttpClient handle multiple requests', () => {
  let httpTesting: HttpTestingController;
  let httpClient: HttpClient;

  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    heroService = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTesting.verify();
  })

  it('should handle multiple requests', () => {
    // make three requests.
    httpClient.get('https://jsonplaceholder.typicode.com/posts/1').subscribe();
    httpClient.get('https://jsonplaceholder.typicode.com/posts/2').subscribe();
    httpClient.get('https://jsonplaceholder.typicode.com/posts/3').subscribe();

    // get all the requests that are made.
    const allGetRequests = httpTesting.match({method: 'GET'});

    // assert that all 3 requests were made.
    expect(allGetRequests.length).toBe(3);

    // flush the response of each request.
    allGetRequests[0].flush({id: 1, title: 'title1', body: 'body1'});
    allGetRequests[1].flush({id: 2, title: 'title2', body: 'body2'});
    allGetRequests[2].flush({id: 3, title: 'title3', body: 'body3'});
  })

  it('should call HTTP request', () => {
    heroService.getHeroes().subscribe((users) => {
      console.log(users);
      expect(users).toEqual(data);
    });
    const req = httpTesting.expectOne('https://fakerapi.it/api/v2/users');
    expect(req.request.method).toBe('GET');
    const data = [{id: 1, firstname: 'title1'}];
    req.flush(data);
  })

  // no we are working with exceptOne and exceptNone.
  it('should call HTTP request called ones with a non null body', () => {
    httpClient.post('https://jsonplaceholder.typicode.com/posts',
      { userId: 198, id: 198, title: 'Except one', body: '"Except one" means "with the exception of one" or "excluding one". It signifies that all members of a group or category are included, except for one specific individual or instance. For example, "All the students passed the exam except one" means that all students except one student passed the exam.'}
    ).subscribe();
    const req = httpTesting.expectOne((request) => request.body !== null);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      userId: 198,
      id: 198,
      title: 'Except one',
      body: '"Except one" means "with the exception of one" or "excluding one". It signifies that all members of a group or category are included, except for one specific individual or instance. For example, "All the students passed the exam except one" means that all students except one student passed the exam.'})
  })

  it('should assert that no HTTP requests have been made', () => {
    httpClient.get('https://jsonplaceholder.typicode.com/posts/198').subscribe();
    const request = httpTesting.expectOne('https://jsonplaceholder.typicode.com/posts/198');
    httpTesting.expectNone((request) => request.method !== 'GET');
    expect(request.request.method).toBe('GET');
  })

  it('should  send ony GET request and no other requests', () => {
    httpClient.get('https://jsonplaceholder.typicode.com/posts/5').subscribe();
    // httpClient.post('https://jsonplaceholder.typicode.com/posts', {id: 5, userId: 5, title: 'title', body: 'body'}).subscribe();
    const request = httpTesting.expectOne((request) => request.method === 'GET' && request.url === 'https://jsonplaceholder.typicode.com/posts/5');
    expect(request.request.method).toBe('GET');
    // httpTesting.expectNone((request) => request.method === 'PUT' || request.method === 'DELETE');
  })
})
