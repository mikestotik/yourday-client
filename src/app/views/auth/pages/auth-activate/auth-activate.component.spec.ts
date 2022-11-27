import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthActivateComponent } from './auth-activate.component';

describe('AuthRegistrationCompleteComponent', () => {
  let component: AuthActivateComponent;
  let fixture: ComponentFixture<AuthActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthActivateComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
