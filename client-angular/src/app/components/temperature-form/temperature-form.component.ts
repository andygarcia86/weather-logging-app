import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemperatureBase } from 'src/app/models/temperature.base';
import { TemperatureService } from '../../services/temperature.service';

declare var M: any;

@Component({
  selector: 'app-temperature-form',
  templateUrl: './temperature-form.component.html',
  styleUrls: ['./temperature-form.component.scss'],
  providers: [TemperatureService]
})
export class TemperatureFormComponent implements OnInit {
  public temperatureForm: FormGroup;
  private loading: boolean;
  
  @Input() temperatureService: TemperatureService;

  constructor() { 
    this.loading = false;
  }

  ngOnInit() {
    this.temperatureForm = new FormGroup({
      temperature: new FormControl('', [Validators.required, Validators.max(100), Validators.min(-100)])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.temperatureForm.controls[controlName].hasError(errorName);
  }

  public addLog(){
    if (this.temperatureForm.valid){
      var temperature = new TemperatureBase();
      temperature.value = this.temperatureForm.value.temperature;

      this.temperatureService.postLog(temperature)
      .subscribe((response: any) => {
        M.toast({html: 'Successfully added', classes: 'blue lighten-2'});
        this.temperatureService.change.emit();
        this.temperatureForm.reset();
      },
      (error: HttpErrorResponse) => {
        M.toast({html: '): An unexpected error occurred adding temperature. <br>Please try again', classes: 'red lighten-2'});
        console.log(error);              
      });
    }    
  }

}
