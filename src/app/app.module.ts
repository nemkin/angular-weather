import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { AppConfigService } from './app-config.service';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { ChartTemperaturePipe } from './pipes/chart-temperature.pipe';
import { WindWidgetComponent } from './wind-widget/wind-widget.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperaturePipe,
    WindWidgetComponent,
    CurrentWeatherComponent,
    AddCityDialogComponent,
    ForecastWeatherComponent,
    ChartTemperaturePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,

    AppRoutingModule,
    MaterialModule,
  ],
  entryComponents: [ AddCityDialogComponent ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.load();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
