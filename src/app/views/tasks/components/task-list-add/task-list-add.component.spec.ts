import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListAddComponent } from './task-list-add.component';

describe('TaskFormComponent', () => {
  let component: TaskListAddComponent;
  let fixture: ComponentFixture<TaskListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
