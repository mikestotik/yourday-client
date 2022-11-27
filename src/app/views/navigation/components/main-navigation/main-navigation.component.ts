import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavItem } from '../../../../interfaces/navigation.interface';
import { NavigationState } from '../../../../models/navigation/store/navigation.state';


@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: [ './main-navigation.component.scss' ]
})
export class MainNavigationComponent {

  @Select(NavigationState.mainNavigation)
  public readonly mainNavigation$!: Observable<NavItem[]>;

}
