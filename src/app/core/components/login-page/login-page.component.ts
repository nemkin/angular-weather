import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userAuth: UserService) {
      this.loginForm = this.formBuilder.group({
        username: [''],
        password: ['']
      });
  }

  ngOnInit() {
  }

  onSubmit(user: User) {
    if (this.userAuth.authenticateUser(user)) {
      this.router.navigate([`/dashboard/${user.username}`]);
    }
  }

}
