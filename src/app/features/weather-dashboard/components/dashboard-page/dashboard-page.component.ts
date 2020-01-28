import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';

import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  title = 'angular-weather';
  cities = ['London', 'Budapest', 'Warsaw'];
  currentCity = 'London';

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  addTab(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent);

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
