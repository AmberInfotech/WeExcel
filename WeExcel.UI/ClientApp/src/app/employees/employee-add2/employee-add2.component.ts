import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    // this.x = 2;

    this.myForm = new FormGroup({
      firstName: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)])),
      lastName: new FormControl(''),
      hireDate: new FormControl(new Date()),
      age: new FormControl(),
      dateOfBirth: new FormControl(),
      pictureId: new FormControl()
    });
  }

  onSubmit() {

    // console.log(this.myForm);
    // console.log(this.myForm.value);

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
    }
  }

}
