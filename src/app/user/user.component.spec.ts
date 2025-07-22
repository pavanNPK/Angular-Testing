import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
});
