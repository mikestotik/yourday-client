import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { Color } from '../../../interfaces/color.interface';
import { Group } from '../../../interfaces/group.interface';
import { GroupService } from '../services/group.service';
import {
  AddGroupToStore,
  CreateGroup,
  CreateTag,
  GetGroup,
  GetGroupColors,
  GetGroups,
  RemoveGroup,
  RemoveGroupFromStore,
  RemoveTag,
  ShareGroup,
  UnShareGroup,
  UpdateGroup,
  UpdateGroupInStore
} from './group.actions';


export interface GroupStateModel {
  groups: Group[];
  colors: Color[];
}


@State<GroupStateModel>({
  name: 'groups',
  defaults: {
    groups: [],
    colors: []
  }
})
@Injectable()
export class GroupState {

  @Selector()
  public static groups(state: GroupStateModel): Group[] {
    return state.groups;
  }


  @Selector()
  public static group(state: GroupStateModel): (id: number) => Group | null {
    return (id: number): Group | null => {
      const group = state.groups.find(i => i.id === id);
      return group ? group : null;
    };
  }


  @Selector()
  public static latest(state: GroupStateModel): Group {
    return state.groups[state.groups.length - 1];
  }


  @Selector()
  public static colors(state: GroupStateModel): Color[] {
    return state.colors;
  }


  @Selector()
  public static color(state: GroupStateModel): (id: number) => Color | null {
    return (id: number): Color | null => {
      const color = state.colors.find(i => i.id === id);
      return color ? color : null;
    };
  }


  constructor(
    private service: GroupService) {
  }


  @Action(GetGroups)
  public getAll(ctx: StateContext<GroupStateModel>) {
    return this.service.getAll().pipe(
      tap(value => ctx.patchState({ groups: value }))
    );
  }


  @Action(GetGroupColors)
  public getColors(ctx: StateContext<GroupStateModel>) {
    return this.service.getColors().pipe(
      tap(value => ctx.patchState({ colors: value }))
    );
  }


  @Action(GetGroup)
  public getOne(ctx: StateContext<GroupStateModel>, action: GetGroup) {
    const state = ctx.getState();

    return this.service.getOne(action.id).pipe(
      tap(value => {
        if (isExistsGroup(state.groups, value)) {
          ctx.patchState({
            groups: updateGroup(state.groups, value)
          });
        } else {
          ctx.patchState({
            groups: [ ...state.groups, value ]
          });
        }
      })
    );
  }


  @Action(CreateGroup)
  public save(ctx: StateContext<GroupStateModel>, action: CreateGroup) {
    const state = ctx.getState();

    return this.service.create(action.value).pipe(
      tap(value => ctx.patchState({
        groups: [ ...state.groups, value ]
      }))
    );
  }


  @Action(UpdateGroup)
  public update(ctx: StateContext<GroupStateModel>, { id, value }: UpdateGroup) {
    const state = ctx.getState();

    return this.service.update(id, value).pipe(
      tap(value => ctx.patchState({
        groups: updateGroup(state.groups, value)
      }))
    );
  }


  @Action(RemoveGroup)
  public remove(ctx: StateContext<GroupStateModel>, action: RemoveGroup) {
    const state = ctx.getState();

    return this.service.delete(action.id).pipe(
      tap(() => ctx.patchState({
        groups: state.groups.filter(i => i.id !== action.id)
      }))
    );
  }


  @Action(AddGroupToStore)
  public addGroupToStore(ctx: StateContext<GroupStateModel>, { group }: AddGroupToStore) {
    const state = ctx.getState();
    return ctx.patchState({
      groups: [ ...state.groups, group ]
    });
  }


  @Action(UpdateGroupInStore)
  public updateGroupInStore(ctx: StateContext<GroupStateModel>, { group }: UpdateGroupInStore) {
    const state = ctx.getState();
    return ctx.patchState({
      groups: updateGroup(state.groups, group)
    });
  }


  @Action(RemoveGroupFromStore)
  public removeGroupFromStore(ctx: StateContext<GroupStateModel>, { id }: RemoveGroupFromStore) {
    const state = ctx.getState();
    return ctx.patchState({
      groups: state.groups.filter(i => i.id !== id)
    });
  }


  @Action(ShareGroup)
  public share(ctx: StateContext<GroupStateModel>, { id, email }: ShareGroup) {
    const state = ctx.getState();

    return this.service.share(id, email).pipe(
      tap(value => ctx.patchState({
        groups: updateGroup(state.groups, value)
      }))
    );
  }


  @Action(UnShareGroup)
  public unshare(ctx: StateContext<GroupStateModel>, { id, email }: UnShareGroup) {
    const state = ctx.getState();

    return this.service.unshare(id, email).pipe(
      tap(value => ctx.patchState({
        groups: updateGroup(state.groups, value)
      }))
    );
  }


  @Action(CreateTag)
  public createTag(ctx: StateContext<GroupStateModel>, action: CreateTag) {
    const groupId = action.payload.group;
    const state = ctx.getState();

    return this.service.createTag(action.payload).pipe(
      tap(tag => ctx.patchState({
        groups: state.groups.map(group => {
          if (group.id === groupId) {
            const tags = group.tags ? group.tags : [];
            return { ...group, tags: [ ...tags, tag ] };
          }
          return group;
        })
      }))
    );
  }


  @Action(RemoveTag)
  public removeTag(ctx: StateContext<GroupStateModel>, action: RemoveTag) {
    const state = ctx.getState();

    return this.service.removeTag(action.tagId).pipe(
      tap(() => ctx.patchState({
        groups: state.groups.map(group => {
          if (group.id === action.groupId) {
            return { ...group, tags: group.tags.filter(i => i.id !== action.tagId) };
          }
          return group;
        })
      }))
    );
  }
}


const updateGroup = (groups: Group[], value: Group): Group[] => {
  return groups.map(group => {
    if (group.id === value.id) {
      return value;
    }
    return group;
  });
};

const isExistsGroup = (groups: Group[], value: Group): boolean => {
  return groups.some(i => i.id === value.id);
};
