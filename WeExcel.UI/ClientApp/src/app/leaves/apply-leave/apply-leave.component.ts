import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail } from 'src/_models/employee.model';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {

  employees: EmployeeDetail[] = [];
  leaveForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {

    // this.leaveForm = new FormGroup({
    //   leaveTypeId : new FormControl(0),
    //   empId: new FormControl(0)
    // });

    this.leaveForm = this.formBuilder.group({
      leaveTypeId: [0, Validators.required],
      empId: [0, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      reason: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(250)
        ])],
    });

    this.bindEmployees();
  }

  bindEmployees() {
    this.http.get('https://localhost:44318/api/Employee')
      .subscribe({
        next: resp => {
          this.employees = resp as EmployeeDetail[];
          console.log(this.employees);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  onSubmit(f: any) {
    if(this.leaveForm.invalid)
    {
      this.toastr.warning('Please fill all data');
      return;
    }
    console.log(f);
  }
}
