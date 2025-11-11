import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  employees: any[] = [];
  isEditMode = false;
  departments = [
    {id: 1, name: 'Human Resources'},
    {id: 2, name: 'Finance'},
    { id: 3, name: 'IT' },
    { id: 4, name: 'Sales' },
    { id: 5, name: 'Marketing' }

  ];


  constructor(private fb: FormBuilder, private empService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employee_Id: [0],
      employee_Name: ['', Validators.required],
      hobbies: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      department_Name: ['', Validators.required]
    });

    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe(res => {
      this.employees = res.dataTable;
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  addEmployee() {
    this.empService.addEmployee(this.employeeForm.value).subscribe(res => {
      alert(res.message);
      this.loadEmployees();
      this.employeeForm.reset();
    });
  }

  editEmployee(emp: any) {
    this.isEditMode = true;
    this.employeeForm.patchValue(emp);
  }

  updateEmployee() {
    this.empService.updateEmployee(this.employeeForm.value).subscribe(res => {
      alert(res.message);
      this.loadEmployees();
      this.isEditMode = false;
      this.employeeForm.reset();
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.deleteEmployee(id).subscribe(res => {
        alert(res.message);
        this.loadEmployees();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.isEditMode = false;
  }
}
