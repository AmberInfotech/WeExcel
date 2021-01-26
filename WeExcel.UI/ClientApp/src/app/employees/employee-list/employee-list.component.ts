import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/_models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.bindData();
  }

  // https://localhost:44318/api/Employee
  bindData() {
    this.httpClient.get('https://localhost:44318/api/employee')
      .subscribe({
        next: resp => {
          this.employees = resp as Employee[];
          console.log(this.employees);
          this.toastrService.success('Employee fetched successfully');
        },
        error: err => {
          console.log(err);
          this.toastrService.error('There was an error');
        }
      });
  }

}
