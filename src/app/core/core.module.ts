import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatabaseService } from './services/database.service';
import { CoreRoutingModule } from './core-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

@NgModule({
  imports: [
    CoreRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
  ],
  providers: [
    DatabaseService,
  ]
})
export class CoreModule { }
