import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail } from 'src/_models/employee.model';
import { Leave } from 'src/_models/leave.model';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {

  employees: EmployeeDetail[] = [];
  leaveTypes: any[] = [];
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
    this.bindLeaveTypes();
  }

  // get accessor
  get f() {
    return this.leaveForm.controls;
  }

  bindEmployees() {
    this.http.get('https://localhost:44318/api/Employee')
      .subscribe({
        next: resp => {
          this.employees = resp as EmployeeDetail[];
        },
        error: err => {
          console.log(err);
        }
      });
  }

  bindLeaveTypes() {
    this.http.get('https://localhost:44318/api/Leave/leaveTypes')
      .subscribe({
        next: resp => {
          this.leaveTypes = resp as any[];
          console.log(this.leaveTypes);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  onSubmit(f: any) {
    if (this.leaveForm.invalid) {
      this.toastr.warning('Please fill all data');
      // return;
    }
    const leave: Leave = {
      leaveTypeId: +f.leaveTypeId,
      empId: +f.empId,
      fromDate: f.fromDate,
      toDate: f.toDate,
      reason: f.reason
    };

    console.log(leave);
    this.http.post('https://localhost:44318/api/Leave/option2', leave)
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
