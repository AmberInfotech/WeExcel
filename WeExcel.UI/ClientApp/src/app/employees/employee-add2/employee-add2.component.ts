import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../_models/employee.model';
import { HttpClient } from '@angular/common/http';


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

  constructor(
    private toastrService: ToastrService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    // this.x = 2;

    this.myForm = new FormGroup({
      firstName: new FormControl('',
        Validators.compose([
          Validators.required,
          //Validators.minLength(10),
          Validators.maxLength(10)])),
      lastName: new FormControl('',
        Validators.compose([Validators.required])),
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

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.toastrService.warning('Data ia invalid', 'ERROR',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
    } else {

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
        hireDate: formatDate(this.myForm.value.hireDate, 'dd-MMM-yyyy HH:mm:ss', 'en-IN'),
        dateOfBirth: formatDate(this.myForm.value.dateOfBirth, 'dd-MMM-yyyy HH:mm:ss', 'en-IN'),
        email: this.myForm.value.email,
        pictureId: this.myForm.value.pictureId,
      };

      this.httpClient.post('https://localhost:44318/api/employee', this.employee)
        .subscribe({
          next: resp => {
            console.log(resp);
          },
          error: err => {
            console.log(err);
          }
        });
      
    }
  }

}
