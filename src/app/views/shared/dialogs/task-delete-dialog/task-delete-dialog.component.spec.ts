import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDeleteDialogComponent } from './task-delete-dialog.component';

describe('DialogComponent', () => {
  let component: TaskDeleteDialogComponent;
  let fixture: ComponentFixture<TaskDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
