import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../services/database.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public errorMessage: string;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private db: DatabaseService) {
      this.loginForm = this.formBuilder.group({
        name: [''],
        password: ['']
      });
  }

  ngOnInit() {}

  onSubmit(userData: {name: string, password: string}) {
    this.db.loginUser(userData).subscribe(
      (result) => {
        if (result.success) {
          this.router.navigate([`/dashboard`]);
        }  else {
          this.errorMessage = result.reason;
        }
      }
    );
  }

}
