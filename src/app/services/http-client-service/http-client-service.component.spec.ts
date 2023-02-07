import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientServiceComponent } from './http-client-service.component';

describe('HttpClientServiceComponent', () => {
  let component: HttpClientServiceComponent;
  let fixture: ComponentFixture<HttpClientServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpClientServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpClientServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
