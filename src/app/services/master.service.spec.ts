import { MasterService } from './master.service';
import {ValueService} from './value.service';
import SpyObj = jasmine.SpyObj;
import {TestBed} from '@angular/core/testing';


// we can make fake value services
// class FakeValueService {
//   getValue() {
//     return 'fake service value'
//   }
// }

// this is the way to write the test cases without testbed. Because we don't need to inject the service
// But now we need to inject the service, so we need to use testbed
// we are creating mock object

/** describe('MasterService', () => {

  // this is one way to mock a service, that is depending on another service
  it('#getValue should return real value from the real value service', () => {
    const masterService = new MasterService(new ValueService());
    expect(masterService.getValue()).toBe('real value');
  });

  // this is another way to mock a service, that is for fake service
  it('#getValue should return fake value from the fake value service', () => {
    const masterService = new MasterService(new FakeValueService() as ValueService);
    expect(masterService.getValue()).toBe('fake service value');
  });

  // this is another way to mock a service, that is for fake service using object
  it('#getValue should return fake value from the object', () => {
    const fake = { getValue: () => 'fake value' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  })

  // this is another way to mock a service, that is for fake service using spy
  it('#getValue should return fake value from the spy', () => {
    const fake = jasmine.createSpyObj('ValueService', ['getValue']);
    fake.getValue.and.returnValue('fake value');
    const masterService = new MasterService(fake);
    expect(masterService.getValue()).toBe('fake value');
    expect(fake.getValue.calls.count()).toBe(1);
  })
}); **/

// the spy object is an object that imitates the real object. It also has spy methods.
// The main purpose of the spy object is to control the behavior of the object.
// in this case, we are creating a spy object for the value service.
// the syntax means we are creating a spy object with the name 'ValueService'
// and it has one method 'getValue' which is also a spy.
describe('MasterService', () => {
  // variable to hold the instance of the service
  let masterService: MasterService;
  // variable to hold the spy object of the value service
  let valueService: SpyObj<ValueService>;

  // this is the setup method, it will run before each test
  beforeEach(() => {
    // create a spy object for the value service, the syntax means we are creating a spy object
    // with the name 'ValueService' and it has one method 'getValue' which is also a spy
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    // configure the testing module
    TestBed.configureTestingModule({
      // provide the master service
      providers: [
        MasterService,
        // provide the value service, but use the spy object instead of the real one
        { provide: ValueService, useValue: spy }
      ]
    });
    // get the instance of the master service
    masterService = TestBed.inject(MasterService);
    // get the instance of the value service, but use the spy object instead of the real one
    valueService = TestBed.inject(ValueService) as SpyObj<ValueService>;
  });

  // this is the test case
  it('#getValue should return real value ', () => {
    // set the return value of the spy object
    valueService.getValue.and.returnValue('real value');
    // call the get value method of the master service
    expect(masterService.getValue()).toBe('real value');
    // check if the spy object method was called
    expect(valueService.getValue.calls.count()).toBe(1);
  });
});
