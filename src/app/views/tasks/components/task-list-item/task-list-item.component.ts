import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task.interface';


@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: [ './task-list-item.component.scss' ]
})
export class TaskListItemComponent implements OnInit {

  @Input()
  public task!: Task;

  @Input()
  public sent!: boolean;

  @Output()
  public check = new EventEmitter<void>();

  @Output()
  public selected = new EventEmitter<void>();

  constructor() { }

  public ngOnInit(): void { }

  public onCheck(): void {
    this.check.emit();
  }

  public onClick(): void {
    this.selected.emit();
  }
}
