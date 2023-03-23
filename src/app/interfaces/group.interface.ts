import { SharedUser } from './account.interface';
import { Entity } from './entity.interface';
import { Tag } from './tag.interface';


export interface CreateGroupPayload {
  title: string;
  color: number | null;
  renewable: boolean;
}


export interface Group extends Entity, CreateGroupPayload {
  owner: number;
  tags: Tag[];
  users: SharedUser[];
}
