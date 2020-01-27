import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.scss']
})
export class AddCityDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) city: string) {
      this.form = formBuilder.group({
        city: [city, [Validators.required, Validators.maxLength(5)]]
      });
    }

  ngOnInit() {

  }
  onAdd() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }
}
