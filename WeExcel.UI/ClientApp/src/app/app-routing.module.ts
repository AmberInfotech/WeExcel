import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAdd2Component } from './employees/employee-add2/employee-add2.component';


const routes: Routes = [
  { path: 'employees/add2', component: EmployeeAdd2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
