import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../_models/employee.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


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
  loading = false;
  empId = 0;
  empName = '';
  lastName = '';

  constructor(
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.params['id'] || 0;
    this.empName = this.activatedRoute.snapshot.params['name'] || '';
    this.lastName = this.activatedRoute.snapshot.params['lname'] || '';

    if (this.empId > 0) {
      this.bindEmployeeDetails();
    }

    this.myForm = new FormGroup({
      firstName: new FormControl('',
        Validators.compose([
          Validators.required,
          //Validators.minLength(10),
          Validators.maxLength(10)])),
      lastName: new FormControl('',
        Validators.compose([Validators.required])),
      hireDate: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(300),
        Validators.email
      ])),
      age: new FormControl(0),
      dateOfBirth: new FormControl(''),
      pictureId: new FormControl()
    });
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.loading = true;
    if (this.myForm.invalid) {
      this.loading = false;
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

      this.prepareData();
      if (this.empId === 0) // Add Mode
      {
        this.create();
      } else { // Edit Mode
        this.update();
      }
    }
  }

  private prepareData() {
    this.employee = {
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      age: parseInt(this.myForm.value.age),
      hireDate: new Date(this.myForm.value.hireDate),
      dateOfBirth: new Date(this.myForm.value.dateOfBirth),
      email: this.myForm.value.email,
      pictureId: this.myForm.value.pictureId || 0,
    };
  }

  private update() {
    this.httpClient.put('https://localhost:44318/api/employee/' + this.empId,
      this.employee)
      .subscribe({
        next: resp => {
          this.toastrService.success('Employee saved successfully');
          this.loading = false;
          this.router.navigateByUrl('/employees');
        },
        error: err => {
          this.loading = false;
          console.log(err);
          this.toastrService.error('There was an error');
        }
      });
  }

  private create() {
    this.httpClient.post('https://localhost:44318/api/employee',
      this.employee)
      .subscribe({
        next: resp => {
          this.toastrService.success('Employee saved successfully');
          // this.router.navigateByUrl('/employees');
          this.loading = false;
        },
        error: err => {
          this.loading = false;
          console.log(err);
          this.toastrService.error('There was an error');
        }
      });
  }

  bindEmployeeDetails() {
    this.httpClient.get('https://localhost:44318/api/employee/' + this.empId)
      .subscribe({
        next: resp => {
          var employee = resp as Employee;
          this.myForm.patchValue(employee);

          this.toastrService.success('Employee loaded successfully');
          this.loading = false;
        },
        error: err => {
          this.loading = false;
          console.log(err);
          this.toastrService.error('There was an error');
        }
      });
  }
}
