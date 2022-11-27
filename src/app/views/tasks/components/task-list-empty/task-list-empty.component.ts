import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-task-list-empty',
  templateUrl: './task-list-empty.component.html',
  styleUrls: [ './task-list-empty.component.scss' ]
})
export class TaskListEmptyComponent implements OnInit {

  @Input()
  public title: string = 'Everything is clear!';

  @Input()
  public subtitle: string = 'Business before pleasure';

  @Input()
  public icon: string = 'icon icon-checkmark-circle-on';

  @Output()
  public addFirst = new EventEmitter<void>();

  constructor() { }

  public ngOnInit(): void { }

}
