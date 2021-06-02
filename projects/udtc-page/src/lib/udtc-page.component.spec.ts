import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdtcPageComponent } from './udtc-page.component';

describe('UdtcPageComponent', () => {
  let component: UdtcPageComponent;
  let fixture: ComponentFixture<UdtcPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdtcPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdtcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
