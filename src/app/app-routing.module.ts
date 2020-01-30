import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import ('./core/core.module')
      .then(m => m.CoreModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import ('./features/weather-dashboard/weather-dashboard.module')
      .then(m => m.WeatherDashboardModule)
  },
  {
    path: '',
    redirectTo: '/account/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
