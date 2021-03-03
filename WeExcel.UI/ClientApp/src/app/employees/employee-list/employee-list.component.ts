import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EnvironmentService } from 'src/app/services/environment.service';
import { EmployeeDetail } from 'src/_models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeDetail[] = [];
  loading: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private environmentService: EnvironmentService
  ) { }

  ngOnInit(): void {
    this.bindData();
  }

  bindData() {
    this.loading = true;
    //this.httpClient.get('https://localhost:44318/api/employee')
    this.httpClient.get(this.environmentService.baseUrl + 'employee')
      .subscribe({
        next: (resp: any) => {
          if (resp.status === true) {
            this.employees = resp.data as EmployeeDetail[];
            this.toastrService.success(resp.message);
          } else {
            this.toastrService.error(resp.message);
          }

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
