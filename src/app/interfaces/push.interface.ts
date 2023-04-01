import { Entity } from './entity.interface';


export interface PushPayload {
  subscription: PushSubscriptionJSON;
}


export interface Push extends Entity, PushPayload {
  owner: number;
}
