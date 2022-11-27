import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  templateUrl: './exit-dialog.component.html',
  styleUrls: [ './exit-dialog.component.scss' ]
})
export class ExitDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExitDialogComponent>) {
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
