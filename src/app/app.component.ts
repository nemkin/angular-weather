import { Component } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-weather';
  cities = ['London', 'Budapest', 'Warsaw'];
  currentCity = 'London';

  constructor(
    public dialog: MatDialog,
  ) {}

  addTab(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.cities.push(result);
      }
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.currentCity = this.cities[tabChangeEvent.index];
  }
}
