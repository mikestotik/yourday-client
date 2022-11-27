import { Color } from './color.interface';
import { Group } from './group.interface';


export interface CreateTagPayload {
  title: string;
  group: number;
  color: number;
}


export interface Tag {
  id: number;
  title: string;
  group: Group;
  color: Color;
}
