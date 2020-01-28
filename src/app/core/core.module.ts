import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  imports: [
    CoreRoutingModule
  ],
  declarations: [
    LoginPageComponent
  ]
})
export class CoreModule { }
