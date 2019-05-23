import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Temperature } from 'src/app/models/temperature';
import { TemperatureService } from '../../services/temperature.service';

declare var M: any;

@Component({
  selector: 'app-temperature-logs',
  templateUrl: './temperature-logs.component.html'  
})
export class TemperatureLogsComponent implements OnInit {
  private loading: boolean;
  private temperatures: Temperature[];

  @Input() temperatureService: TemperatureService;

  constructor(public dialog: MatDialog) { 
    this.loading = false;
  }

  ngOnInit() {
    this.loadLogs();

    this.temperatureService.change.subscribe(dataChanged => {
      this.loadLogs();
    });
  }
  
  public loadLogs(){
    this.loading = true;

    this.temperatureService.getLogs()
    .subscribe((response: Temperature[]) => {
      this.temperatures = response;
      this.loading = false;
    },
    (error: HttpErrorResponse) => {
      M.toast({html: '): An unexpected error occurred loading logs. <br>Please try again', classes: 'red lighten-2'});
      this.temperatures = [];
      this.loading = false;
    });
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
            M.toast({html: 'Successfully deleted', classes: 'blue lighten-2'});
            this.temperatureService.change.emit();
          },
          (error: HttpErrorResponse) => {
            M.toast({html: '): An unexpected error occurred deleting temperature. <br>Please try again', classes: 'red lighten-2'});
          });    
    });
  }

}
