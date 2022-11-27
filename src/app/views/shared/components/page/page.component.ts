import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowMenu } from '../../../../models/menu/store/menu.actions';
import { MenuState } from '../../../../models/menu/store/menu.state';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: [ './page.component.scss' ]
})
export class PageComponent implements OnInit {

  @Input()
  public title!: string | null;

  @Input()
  public titleSuffixIcon!: string;

  @Output()
  public titleClick = new EventEmitter<void>();


  constructor(
    private store: Store) {
  }


  public ngOnInit(): void { }


  public onMenuToggle(): void {
    this.store.dispatch(new ShowMenu(
      !this.store.selectSnapshot(MenuState.shownMenu)
    ));
  }
}
