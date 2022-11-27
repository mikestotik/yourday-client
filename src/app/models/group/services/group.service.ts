import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Color } from '../../../interfaces/color.interface';
import { CreateGroupPayload, Group } from '../../../interfaces/group.interface';
import { CreateTagPayload, Tag } from '../../../interfaces/tag.interface';
import { ColorResource } from '../resources/color.resource';
import { GroupResource } from '../resources/group.resource';
import { TagResource } from '../resources/tag.resource';


@Injectable()
export class GroupService {

  constructor(
    private resource: GroupResource,
    private colorResource: ColorResource,
    private tagResource: TagResource) {
  }


  public getAll(): Observable<Group[]> {
    return this.resource.getAll().pipe(
      map(list => list.sort((a, b) => a.id! - b.id!))
    );
  }


  public getOne(id: number): Observable<Group> {
    return this.resource.getOne(id);
  }


  public create(value: CreateGroupPayload): Observable<Group> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<CreateGroupPayload>): Observable<Group> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<unknown> {
    return this.resource.delete(id);
  }


  public share(id: number, email: string): Observable<Group> {
    return this.resource.share(id, email);
  }


  public unshare(id: number, email: string): Observable<Group> {
    return this.resource.unshare(id, email);
  }


  public getColors(): Observable<Color[]> {
    return this.colorResource.getColors();
  }


  public createTag(value: CreateTagPayload): Observable<Tag> {
    return this.tagResource.create(value);
  }


  public removeTag(id: number): Observable<void> {
    return this.tagResource.remove(id);
  }
}
