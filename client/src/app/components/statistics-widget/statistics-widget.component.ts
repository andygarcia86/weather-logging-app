import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Statistics } from 'src/app/models/statistics';
import { TemperatureService } from '../../services/temperature.service';

declare var M: any;

@Component({
  selector: 'app-statistics-widget',
  templateUrl: './statistics-widget.component.html'  
})
export class StatisticsWidgetComponent implements OnInit {
  private statistics: Statistics;
  private loading: boolean;

  constructor(private temperatureService: TemperatureService) { 
    this.loading = false;
  }

  ngOnInit() {
    this.statistics = new Statistics();
    this.loadStatistics();

    this.temperatureService.change.subscribe(dataChanged => {
      this.loadStatistics();
    });
  }
  
  public loadStatistics(){
    this.loading = true;

    this.temperatureService.getStatistics()
    .subscribe((response: Statistics) => {
      this.statistics = response;
      this.loading = false;
    },
    (error: HttpErrorResponse) => {
      M.toast({html: '): An unexpected error occurred loading statistics. <br>Please try again', classes: 'red lighten-2'});
      console.log(error);              
      this.statistics.average = null;
      this.statistics.highest = null;
      this.statistics.lowest = null;
      this.statistics.median = null;

      this.loading = false;
    });
  }

}
