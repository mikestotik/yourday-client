import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackData, SnackType } from '../../../../interfaces/snack.interface';


@Component({
  selector: 'app-snack-simple',
  templateUrl: './snack-simple.component.html',
  styleUrls: [ './snack-simple.component.scss' ]
})
export class SnackSimpleComponent implements OnInit {

  public types = SnackType;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: SnackData) {
  }


  public ngOnInit(): void { }

}
