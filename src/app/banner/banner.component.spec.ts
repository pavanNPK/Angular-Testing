import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import {By} from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let pElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}] // this is to detect the changes in the component automatically
      // if we are add this we can remove fixture.detectChanges();
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    pElement = fixture.nativeElement.querySelector('p');
    fixture.detectChanges(); // if we remove this line the test will fail. its does not update the DOM
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  //
  it ('should display the title', () => {
    // component.title.set('title changed'); // we can change the value of the property
    fixture.detectChanges();
    expect(pElement.textContent).toContain(component.title());
  })

  // async await to update new title
  it ('should display the original title changed after title change', async () => {
    const oldTitle = component.title();
    const newTitle = 'title changed';
    component.title.set(newTitle);
    expect(pElement.textContent).toContain(oldTitle);
    await fixture.whenStable();
    expect(pElement.textContent).toContain(newTitle);
  })
});
