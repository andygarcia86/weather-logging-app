import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from '../app/services/app.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TemperatureFormComponent } from './components/temperature-form/temperature-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsWidgetComponent } from './components/statistics-widget/statistics-widget.component';
import { TemperatureLogsComponent } from './components/temperature-logs/temperature-logs.component';

import { TemperatureService } from './services/temperature.service';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ConfirmDialogComponent,
    StatisticsWidgetComponent,
    TemperatureLogsComponent,
    TemperatureFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    ConfirmDialogComponent
  ],
  providers: [
    TemperatureService,
    AppConfig,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
