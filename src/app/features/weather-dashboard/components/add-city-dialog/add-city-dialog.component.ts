import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityValidatorDirective } from 'src/app/shared/validators/city-validator.directive';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.scss'],
  providers: [CityValidatorDirective]
})
export class AddCityDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCityDialogComponent>,
    public cityValidator: CityValidatorDirective,
    @Inject(MAT_DIALOG_DATA) city: string) {
      this.form = formBuilder.group({
        city: [city, { validators: [Validators.required], asyncValidators: [cityValidator] }]
      });
    }

  ngOnInit() {

  }
  onAdd() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.city);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onAdd();
    }
  }
}
