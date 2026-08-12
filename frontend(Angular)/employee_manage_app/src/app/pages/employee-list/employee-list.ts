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
export class EmployeeList implements OnInit {
  employeeService = inject(EmployeeService);

  loadAllEmployees() {
    return this.employeeService.getAllEmployees().subscribe({
      next: (result: IEmployeeListModel[]) => {
        console.log('All employees loaded');
        this.employeeList.set(result);
      },
      error(error) {
        console.log(error);
      },
    });
  }

  employeeList = signal<IEmployeeListModel[]>([]);

  onDeleteEmployee(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');

    if (!confirmDelete) {
      return;
    }

    this.employeeService.onDeleteEmployee(id).subscribe({
      next: (result) => {
        alert('Employee deleted successfully');

        // Remove employee from UI
        this.employeeList.update((employees) =>
          employees.filter((employee) => employee.employeeId !== id),
        );
      },

      error: (error) => {
        console.log('Delete Error:', error);

        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to delete employee');
        }
      },
    });
  }

  ngOnInit(): void {
    this.loadAllEmployees();
  }
}
