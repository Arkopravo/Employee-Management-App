import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../../models/Employee.model';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Observable } from 'rxjs';
import { DesignationListModel } from '../../models/Department.model';
import { Master } from '../../services/master';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  newEmployeeObj: EmployeeModel = new EmployeeModel();

  employeeService = inject(EmployeeService);
  masterService = inject(Master);
  $designationList: Observable<DesignationListModel[]> = new Observable<DesignationListModel[]>();

  activeRoute = inject(ActivatedRoute);

  router = inject(Router);

  constructor() {
    this.activeRoute.params.subscribe((res: any) => {
      if (res.id != 0) {
        this.newEmployeeObj.employeeId = res.id;
      }
      this.getEmployeeById();
    });
    this.$designationList = this.masterService.getAllDesignations();
  }

  getEmployeeById() {
    this.employeeService.getAllEmployeeById(this.newEmployeeObj.employeeId).subscribe({
      next: (res) => {
        this.newEmployeeObj = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSaveEmployee() {
    this.employeeService.saveEmployee(this.newEmployeeObj).subscribe({
      next: (result) => {
        alert('Emoloyee created successfully');
        this.onReset();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onReset() {
    this.newEmployeeObj = new EmployeeModel();
  }

  onUpdateEmployee(id: number) {
    this.employeeService.onUpdateEmployee(id, this.newEmployeeObj).subscribe({
      next: (result) => {
        alert('Employee updated successfully');

        this.newEmployeeObj = result;
        this.router.navigate(['/employees']);
      },

      error: (error) => {
        console.log(error);

        if (error.error) {
          console.log('API Error:', error.error);
        }
      },
    });
  }
}
