import { Component, OnInit } from '@angular/core';
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
    
  constructor(private temperatureService: TemperatureService) { 
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
        this.showSuccessMessage('Successfully added');
        this.temperatureService.change.emit();
        this.temperatureForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.showErrorMessage('adding temperature', error);
      });
    }    
  }

  private showSuccessMessage(msg: string){
    M.toast({html: msg, classes: 'blue lighten-2'});
  }

  private showErrorMessage(msg: string, error: HttpErrorResponse){
    M.toast({html: '): An unexpected error occurred ' + msg + '. <br>Please try again', classes: 'red lighten-2'});
    console.log(error);              
  }

}
