import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { IEmployeeListModel } from '../../models/Employee.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit{
  employeeService = inject(EmployeeService);

  loadAllEmployees() {
    return this.employeeService.getAllEmployees().subscribe({
      next:(result: IEmployeeListModel[]) => {
        console.log("All employees loaded");
        this.employeeList.set(result);
      }, error(error) {
        console.log(error);
      }
    });
  }

  employeeList = signal<IEmployeeListModel[]>([]);


  ngOnInit(): void {
    this.loadAllEmployees();
  }
}
