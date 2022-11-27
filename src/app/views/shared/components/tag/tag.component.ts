import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: [ './tag.component.scss' ]
})
export class TagComponent implements OnInit {

  @Input()
  public color?: string;

  @Input()
  public icon!: string;

  @Input()
  public size!: 'md' | 'lg';

  @Input()
  public deleteIcon!: string;

  @Input()
  public deleteDisabled!: boolean;

  @Output()
  public delete = new EventEmitter<void>();


  constructor() { }


  public ngOnInit(): void { }


  public onRemoveTag(): void {
    this.delete.emit();
  }
}
