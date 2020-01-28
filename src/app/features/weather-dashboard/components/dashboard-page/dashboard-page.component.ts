import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatTabChangeEvent } from '@angular/material';

import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  title = 'angular-weather';
  username: string;
  cities: string[];
  selectedTab = 0;

  @ViewChild('tabGroup', {static: false}) tabGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.cities = this.userService.getCitiesFromUsername(this.username);
  }

  addTab(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cities.push(result);
        this.selectedTab = this.cities.length - 1 ;
        this.userService.addCityToUsername(this.username, result);
      }
    });
  }
}
