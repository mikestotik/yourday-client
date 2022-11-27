import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Color } from '../../../interfaces/color.interface';


@Injectable({
  providedIn: 'root'
})
export class ColorResource {

  constructor(
    private http: HttpClient) {
  }


  public getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(ApiConfig.COLORS);
  }
}
