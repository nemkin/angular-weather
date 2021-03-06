import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTabGroup } from '@angular/material';

import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';
import { DatabaseService } from 'src/app/core/services/database.service';
import { CityList } from 'src/app/core/models/cities';
import { User } from 'src/app/core/models/user';
import { Response } from 'src/app/core/models/response';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  title = 'angular-weather';
  user: User;
  cityList: CityList;
  selectedTab = 0;

  @ViewChild('tabGroup', {static: false}) tabGroup: MatTabGroup;

  constructor(
    private router: Router,
    private db: DatabaseService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.db.getLoggedInUser().subscribe((u: User) => {
      this.user = u;
    });
    this.db.loggedInUserChanges.subscribe((u: User) => {
      this.user = u;
    });

    this.db.getLoggedInUserCityList().subscribe((cl: CityList) => {
      this.cityList = cl;
    });
    this.db.loggedInUserCityListChanges.subscribe((cl: CityList) => {
      this.cityList = cl;
    });
  }

  logout(): void {
    this.db.logoutCurrentUser().subscribe((result: Response) => {
      if (result.success) {
        this.router.navigate(['/account/login']);
      }
    });
  }
  addTab(event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(AddCityDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.db.addCityToLoggedInUser(result).subscribe(result2 => {
          if (!result2.success) {
            console.log('City already exists.');
          }
          this.selectCity(result);
        });
      }
    });
  }

  removeTab(i: number, event: Event): void {
    event.preventDefault();
    if (this.selectedTab === i) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = Math.max((i - 1), 0);
      });
    }
    this.db.removeCityFromLoggedInUser(this.cityList.cities[i]);
  }

  selectCity(city: string): void {
    const index = this.cityList.cities.findIndex((c: string) => (c === city));
    if (index !== null && index !== undefined) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = index;
      });
    } else {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 0;
      });
    }
  }
}
