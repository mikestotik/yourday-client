import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackSimpleComponent } from './snack-simple.component';

describe('SnackSimpleComponent', () => {
  let component: SnackSimpleComponent;
  let fixture: ComponentFixture<SnackSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
