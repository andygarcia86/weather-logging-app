import { Component } from '@angular/core';
import { TemperatureService } from '../app/services/temperature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Weather logging';

  constructor(private temperatureService: TemperatureService) { 
    
  }

}
