import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor() { }


  public addPushSubscriber(sub: PushSubscription): Observable<any> {
    console.log(sub);
    return of();
  }
}
