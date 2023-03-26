import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerSettings } from '../../../interfaces/settings.interface';
import { SettingsResource } from '../resources/settings.resource';


@Injectable()
export class SettingsService {

  constructor(
    private resource: SettingsResource) {
  }


  public find(): Observable<ServerSettings> {
    return this.resource.find();
  }


  public update(id: number, value: Partial<ServerSettings>): Observable<ServerSettings> {
    return this.resource.update(id, value);
  }

}
