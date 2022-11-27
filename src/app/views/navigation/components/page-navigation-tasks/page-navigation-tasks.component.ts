import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { DialogConfig } from '../../../../config/dialog.config';
import { AppRoutes, MainRoutes } from '../../../../config/routes.config';
import { Group } from '../../../../interfaces/group.interface';
import { NavItem, PageNavigation } from '../../../../interfaces/navigation.interface';
import { GroupState } from '../../../../models/group/store/group.state';
import { NavigationState } from '../../../../models/navigation/store/navigation.state';
import { SettingsState } from '../../../../models/settings/store/settings.state';
import { GroupCreateComponent } from '../../../groups/components/group-create/group-create.component';


@Component({
  selector: 'app-page-navigation-tasks',
  templateUrl: './page-navigation-tasks.component.html',
  styleUrls: [ './page-navigation-tasks.component.scss' ]
})
export class PageNavigationTasksComponent implements OnInit, PageNavigation {

  @Select(NavigationState.pageNavTasks)
  public pageNavigation$!: Observable<NavItem[]>;

  @Select(GroupState.groups)
  public readonly groups$!: Observable<Group[]>;

  @Select(SettingsState.pinnedGroups)
  public readonly pinnedGroups$!: Observable<number[]>;

  @Output()
  public itemEvent = new EventEmitter<void>();

  public appRoutes = AppRoutes;
  public mainRoutes = MainRoutes;


  constructor(
    private dialog: MatDialog,
    private router: Router) {
  }


  public ngOnInit(): void { }


  public onAddTaskGroup(): void {
    this.dialog.open(GroupCreateComponent, DialogConfig.defaultModalSM)
      .afterClosed()
      .pipe(
        filter(groupId => groupId)
      )
      .subscribe(groupId => this.router.navigate([ AppRoutes.App, MainRoutes.Tasks, groupId ]));
  }
}
