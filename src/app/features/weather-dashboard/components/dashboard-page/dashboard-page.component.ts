import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatTabChangeEvent } from '@angular/material';

import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';
import { DatabaseService } from 'src/app/core/services/database.service';
import { CityList } from 'src/app/core/models/cities';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  title = 'angular-weather';
  cityList: CityList;
  selectedTab = 0;

  @ViewChild('tabGroup', {static: false}) tabGroup;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.db.getCityListForLoggedInUser().subscribe((cl: CityList) => {
      this.cityList = cl;
    });
    this.db.loggedInUserCityList.subscribe((cl: CityList) => {
      this.cityList = cl;
    });
  }

  addTab(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.db.addCityToLoggedInUser(result);
      }
    });
  }

  removeTab(i: number): void {
    this.db.removeCityFromLoggedInUser(this.cityList.cities[i]);
  }

}
