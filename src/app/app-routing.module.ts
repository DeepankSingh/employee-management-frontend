import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './compnents/employee/employee.component';

const routes: Routes = [

  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {path: 'employees', component: EmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
