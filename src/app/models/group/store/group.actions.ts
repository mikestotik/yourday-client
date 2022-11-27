import { CreateGroupPayload, Group } from '../../../interfaces/group.interface';
import { CreateTagPayload } from '../../../interfaces/tag.interface';


export class GetGroups {
  static readonly type = '[Group] GetGroups';
}


export class GetGroup {
  static readonly type = '[Group] GetGroup';


  constructor(
    public id: number) {
  }
}


export class CreateGroup {
  static readonly type = '[Group] CreateGroup';


  constructor(
    public value: CreateGroupPayload) {
  }
}


export class UpdateGroup {
  static readonly type = '[Group] UpdateGroup';


  constructor(
    public id: number,
    public value: Partial<CreateGroupPayload>) {
  }
}


export class RemoveGroup {
  static readonly type = '[Group] RemoveGroup';


  constructor(
    public id: number) {
  }
}


export class AddGroupToStore {
  static readonly type = '[Group] AddGroupToStore';


  constructor(
    public group: Group) {
  }
}


export class UpdateGroupInStore {
  static readonly type = '[Group] UpdateGroupInStore';


  constructor(
    public group: Group) {
  }
}


export class RemoveGroupFromStore {
  static readonly type = '[Group] RemoveGroupFromStore';


  constructor(
    public id: number) {
  }
}


export class GetGroupColors {
  static readonly type = '[Group] GetGroupColors';
}


export class CreateTag {
  static readonly type = '[Group] CreateTag';


  constructor(
    public payload: CreateTagPayload) {
  }
}


export class RemoveTag {
  static readonly type = '[Group] RemoveTag';


  constructor(
    public tagId: number,
    public groupId: number) {
  }
}


export class ShareGroup {
  static readonly type = '[Group] ShareGroup';


  constructor(
    public id: number,
    public email: string) {
  }
}


export class UnShareGroup {
  static readonly type = '[Group] UnShareGroup';


  constructor(
    public id: number,
    public email: string) {
  }
}
