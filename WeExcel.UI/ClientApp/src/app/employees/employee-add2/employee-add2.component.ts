import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../_models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.x = 2;

    this.myForm = new FormGroup({
      firstName: new FormControl('latif',
        Validators.compose([
          Validators.required,
          //Validators.minLength(10),
          Validators.maxLength(10)])),
      lastName: new FormControl('nadaf',
        Validators.compose([Validators.required])),
      hireDate: new FormControl('01/01/2000 00:00'),
      email: new FormControl('latuif@mail.com', Validators.compose([
        Validators.required,
        Validators.maxLength(300),
        Validators.email
      ])),
      age: new FormControl(30),
      dateOfBirth: new FormControl('01/01/1999 00:00'),
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

      this.employee = {
        firstName: this.myForm.value.firstName,
        lastName: this.myForm.value.lastName,
        age: parseInt(this.myForm.value.age),
        hireDate: new Date(this.myForm.value.hireDate),
        dateOfBirth: new Date(this.myForm.value.dateOfBirth),
        email: this.myForm.value.email,
        pictureId: this.myForm.value.pictureId || 0,
      };

      console.log(this.employee);

      this.httpClient.post('https://localhost:44318/api/employee', this.employee)
        .subscribe({
          next: resp => {
            this.toastrService.success('Employee saved successfully');
            this.router.navigateByUrl('/employees');
          },
          error: err => {
            console.log(err);
            this.toastrService.error('There was an error');
          }
        });
      
    }
  }

}
