import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../_models/employee.model';

@Component({
  selector: 'app-employee-add2',
  templateUrl: './employee-add2.component.html',
  styleUrls: ['./employee-add2.component.scss']
})
export class EmployeeAdd2Component implements OnInit {

  x = 1;
  // y: number;
  // z: number = 1;
  // y: number;
  // z: number = 1;
  myForm!: FormGroup;
  employee!: Employee;

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    // this.x = 2;

    this.myForm = new FormGroup({
      firstName: new FormControl('',
        Validators.compose([
          Validators.required,
          //Validators.minLength(10),
          Validators.maxLength(10)])),
      lastName: new FormControl(''),
      hireDate: new FormControl(new Date()),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(300),
        Validators.email
      ])),
      age: new FormControl(),
      dateOfBirth: new FormControl(),
      pictureId: new FormControl()
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.toastrService.warning('Data ia invalid', 'ERROR',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
    } else {
      this.toastrService.success('Form submitted', 'SUCCESS', {
        timeOut: 4000,
        positionClass: 'toast-bottom-right',
      });

      // const hdate = this.myForm.controls.hireDate.value;
      // const formattedDate = formatDate(hdate, 'dd-MMM-yyyy hh:mm:ss', 'en-IN');
      // const formattedDate2 = formatDate(hdate, 'dd-MMM-yyyy HH:mm:ss', 'en-IN');
      // console.log(formattedDate);
      // console.log(formattedDate2);

      console.log(this.myForm.value);

      this.employee = {
        firstName: this.myForm.value.firstName,
        lastName: this.myForm.value.lastName,
        // age: +this.myForm.value.age,
        age: parseInt(this.myForm.value.age),
        hireDate: this.myForm.value.hireDate,
        dateOfBirth: this.myForm.value.dateOfBirth,
        email: this.myForm.value.email,
        pictureId: this.myForm.value.pictureId,
      };

      console.log(this.employee);
    }
  }

}
