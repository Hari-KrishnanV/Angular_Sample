import { Injectable } from '@angular/core';
import { usStatesInfo } from '../sample-data/us-states';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesInfoService {

  constructor() { }

  getStatesInfo(): Observable<any> {
    return of(usStatesInfo);
  }
}
