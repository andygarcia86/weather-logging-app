import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemperatureBase } from '../models/temperature.base';
import { Temperature } from '../models/temperature';
import { AppConfig } from './app.config';

@Injectable()
export class TemperatureService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) { 
  }

  public getLogs(): any{
    return this.http.get<Temperature[]>(this.apiServer.uri);
  }

  public getStatistics(){
    return this.http.get(this.apiServer.uri + 'statistics');
  }

  public postLog(temperature: TemperatureBase){
    return this.http.post<TemperatureBase>(this.apiServer.uri, temperature);
  }

  public deleteLog(id: string){
    return this.http.delete(this.apiServer.uri + id);
  }

}
