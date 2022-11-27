import { SharedUser } from './account.interface';
import { Entity } from './entity.interface';
import { Tag } from './tag.interface';


export interface CreateGroupPayload {
  title: string;
  color: number | null;
}


export interface Group extends Entity {
  title: string;
  owner: number;
  tags: Tag[];
  color: number | null;
  users: SharedUser[];
}
