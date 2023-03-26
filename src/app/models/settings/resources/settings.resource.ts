import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { ServerSettings } from '../../../interfaces/settings.interface';


@Injectable()
export class SettingsResource {

  constructor(
    private http: HttpClient) {
  }


  public find(): Observable<ServerSettings> {
    return this.http.get<ServerSettings>(ApiConfig.SETTINGS);
  }


  public update(id: number, value: Partial<ServerSettings>): Observable<ServerSettings> {
    return this.http.patch<ServerSettings>(`${ ApiConfig.SETTINGS }/${ id }`, value);
  }

}
