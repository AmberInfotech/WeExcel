import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeAdd2Component } from './employees/employee-add2/employee-add2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { ApplyLeaveComponent } from './leaves/apply-leave/apply-leave.component';
import { ListLeavesComponent } from './leaves/list-leaves/list-leaves.component';
import { EnvironmentService } from './services/environment.service';
import { RepositoryService } from './services/repository.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeAdd2Component,
    EmployeeListComponent,
    ApplyLeaveComponent,
    ListLeavesComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgbModule, // ToastrModule added
    HttpClientModule,
  ],
  exports: [],
  providers: [
    EnvironmentService,
    RepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
