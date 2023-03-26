import { Color } from '../enums/color.enum';
import { Group } from './group.interface';


export interface CreateTagPayload {
  title: string;
  group: number;
  color?: Color;
}


export interface Tag {
  id: number;
  title: string;
  group: Group;
  color: Color;
}
