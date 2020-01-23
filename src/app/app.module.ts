import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { AppConfigService } from './app-config.service';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { WindWidgetComponent } from './wind-widget/wind-widget.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperaturePipe,
    WindWidgetComponent,
    CurrentWeatherComponent,
    AddCityDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

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
