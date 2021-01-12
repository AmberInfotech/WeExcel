import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  hireDate: Date;
  age: number;

  constructor(
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.firstName == '' || this.lastName == '') {
      this.toastrService.warning('Data ia invalid');
    }
  }

}
