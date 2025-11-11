import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
//7036
  private apiUrl = 'https://localhost:7036/api/Employee';  // ✅ match your backend port

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetEmployee`);
  }

  addEmployee(data: any): Observable<any> {
    // API expects query params
    return this.http.post(`${this.apiUrl}/AddEmployee?employeeName=${data.employee_Name}&hobbies=${data.hobbies}&age=${data.age}&dep_id=${data.department_Id}`, {});
  }

  updateEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/UpdateEmployee?empId=${data.employee_Id}&employeeName=${data.employee_Name}&hobbies=${data.hobbies}&age=${data.age}&dep_id=${data.department_Id}`, {});
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteEmployee?employeeId=${id}`);
  }

}
