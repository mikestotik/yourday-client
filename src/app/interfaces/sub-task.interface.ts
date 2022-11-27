import { Entity } from './entity.interface';


export interface SubTaskPayload {
  title: string;
  completed?: boolean;
  order?: number;
}


export interface SubTask extends Entity, SubTaskPayload {}
