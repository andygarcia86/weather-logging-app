import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemperatureBase } from '../models/temperature.base';
import { Temperature } from '../models/temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  readonly API_BASE_URL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { 
  }

  public getLogs(): any{
    return this.http.get<Temperature[]>(this.API_BASE_URL);
  }

  public getStatistics(){
    return this.http.get(this.API_BASE_URL + 'statistics');
  }

  public postLog(temperature: TemperatureBase){
    return this.http.post<TemperatureBase>(this.API_BASE_URL, temperature);
  }

  public deleteLog(id: string){
    return this.http.delete(this.API_BASE_URL + id);
  }

}
