import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';


// this is the way to write the test cases without testbed. Because we don't need to inject the service

/** describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ValueService);
    service = new ValueService();
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('#getValue should return real value ', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('#getObservableValue should return value from of observable value', (done: DoneFn) => {
    service.getObservableValue().subscribe(data => {
      expect(data).toBe('observable value');
      done()
    })
  });

  it('#getPromiseValue should return value from promise value', (done: DoneFn) => {
    service.getPromiseValue().then(data => {
      expect(data).toBe('promise value');
      done()
    })
  });
}); **/

// this service is a standalone service. Doesn't depend on any other service. But master service depends on this service
describe('ValueService', () => {
  let service: ValueService;

  // Runs code before each test within a suite (setup).
  beforeEach(() => {
    TestBed.configureTestingModule({
      // we are providing the service to the testbed
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('#getValue should return real value ', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('#getObservableValue should return value from of observable value', (done: DoneFn) => {
    service.getObservableValue().subscribe(data => {
      expect(data).toBe('observable value');
      done()
    })
  });

  it('#getPromiseValue should return value from promise value', (done: DoneFn) => {
    service.getPromiseValue().then(data => {
      expect(data).toBe('promise value');
      done()
    })
  });
});
