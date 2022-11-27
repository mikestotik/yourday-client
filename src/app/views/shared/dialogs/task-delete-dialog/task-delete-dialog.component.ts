import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  templateUrl: './task-delete-dialog.component.html',
  styleUrls: [ './task-delete-dialog.component.scss' ]
})
export class TaskDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskDeleteDialogComponent>) {
  }

  public ngOnInit(): void { }

  @HostListener('document:keydown.enter', [ '$event' ])
  public onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onClose(true);
    }
  }

  public onClose(close: boolean): void {
    this.dialogRef.close(close);
  }
}
