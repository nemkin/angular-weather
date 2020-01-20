import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './app-config.service';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { WindWidgetComponent } from './wind-widget/wind-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailComponent,
    TemperaturePipe,
    WindWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
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
