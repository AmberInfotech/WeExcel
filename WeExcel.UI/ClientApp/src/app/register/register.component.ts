import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/_models/user.model';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userId = 0;
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private repositoryService: RepositoryService,
    private toastrService: ToastrService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)])],
    });
  }

  onSubmit(latif: any) {
    const user: User = {
      userName: latif.username,
      email: latif.email,
      password: latif.password,
      phoneNumber: latif.phone
    };

    const route = 'User';
    this.repositoryService.post(route, user).subscribe({
      next: resp => {
        this.toastrService.success('Employee fetched successfully');
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
