import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { CreateTagPayload, Tag } from '../../../interfaces/tag.interface';


@Injectable({
  providedIn: 'root'
})
export class TagResource {

  constructor(
    private http: HttpClient) {
  }


  public create(value: CreateTagPayload): Observable<Tag> {
    return this.http.post<Tag>(ApiConfig.TAGS, value);
  }


  public remove(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.TAGS }/${ id }`);
  }

}
