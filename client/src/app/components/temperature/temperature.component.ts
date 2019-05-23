import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Statistics } from 'src/app/models/statistics';
import { TemperatureBase } from 'src/app/models/temperature.base';
import { Temperature } from 'src/app/models/temperature';
import { TemperatureService } from '../../services/temperature.service';

declare var M: any;

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
  providers: [TemperatureService]
})
export class TemperatureComponent implements OnInit {
  public temperatureForm: FormGroup;
  private temperatures: Temperature[];
  private loadingLogs: boolean;
  private loadingStatistics: boolean;
  private statistics: Statistics;

  constructor(private temperatureService: TemperatureService, public dialog: MatDialog) { 
    this.statistics = new Statistics();
    this.loadingLogs = false;
  }

  ngOnInit() {
    this.temperatureForm = new FormGroup({
      temperature: new FormControl('', [Validators.required, Validators.max(100), Validators.min(-100)])
    });

    this.loadData();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.temperatureForm.controls[controlName].hasError(errorName);
  }

  public loadData(){
    this.loadLogs();
    this.loadStatistics();
  }

  public loadLogs(){
    this.loadingLogs = true;

    this.temperatureService.getLogs()
    .subscribe((response: Temperature[]) => {
      this.temperatures = response;
      this.loadingLogs = false;
    },
    (error: HttpErrorResponse) => {
      this.showErrorMessage('loading logs', error);
      this.temperatures = [];
      this.loadingLogs = false;
    });
  }

  public loadStatistics(){
    this.loadingStatistics = true;

    this.temperatureService.getStatistics()
    .subscribe((response: Statistics) => {
      this.statistics = response;
      this.loadingStatistics = false;
    },
    (error: HttpErrorResponse) => {
      this.showErrorMessage('loading statistics', error);
      this.statistics.average = null;
      this.loadingStatistics = false;
    });
  }

  public addLog(){
    if (this.temperatureForm.valid){
      var temperature = new TemperatureBase();
      temperature.value = this.temperatureForm.value.temperature;

      this.temperatureService.postLog(temperature)
      .subscribe((response: any) => {
        this.showSuccessMessage('Successfully added');
        this.temperatureForm.reset();
        this.loadData();
      },
      (error: HttpErrorResponse) => {
        this.showErrorMessage('adding temperature', error);
      });
    }    
  }

  public deleteLog(id: string){
    const data = {
      title: 'Delete confirmation',
      text: 'Are you sure you want to remove this log?'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: data
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      this.temperatureService.deleteLog(id)
          .subscribe((response: any) => {
            this.showSuccessMessage('Successfully deleted');
            this.loadData();
          },
          (error: HttpErrorResponse) => {
            this.showErrorMessage('deleting temperature', error);
          });    
    });
  }

  private showSuccessMessage(msg: string){
    M.toast({html: msg, classes: 'blue lighten-2'});
  }

  private showErrorMessage(msg: string, error: HttpErrorResponse){
    M.toast({html: '): An unexpected error occurred ' + msg + '. <br>Please try again', classes: 'red lighten-2'});
    console.log(error);              
  }
  
}
