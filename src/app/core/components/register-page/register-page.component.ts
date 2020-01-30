import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../services/database.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private db: DatabaseService) {
      this.registerForm = this.formBuilder.group({
        name: [''],
        password: ['']
      });
  }

  ngOnInit() {}

  onSubmit(userData: {name: string, password: string}) {
    this.db.registerUser(userData).subscribe(
      (result) => {
        if (result.success) {
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

}
