import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAdd2Component } from './employees/employee-add2/employee-add2.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { ApplyLeaveComponent } from './leaves/apply-leave/apply-leave.component';


const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/add2', component: EmployeeAdd2Component },
  { path: 'employees/edit/:id/:name/:lname', component: EmployeeAdd2Component },
  { path: 'apply-leave', component: ApplyLeaveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
