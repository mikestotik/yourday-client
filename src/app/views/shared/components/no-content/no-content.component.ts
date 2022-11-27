import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: [ './no-content.component.scss' ]
})
export class NoContentComponent implements OnInit {

  @Input()
  public title!: string;

  constructor() { }

  public ngOnInit(): void { }

}
