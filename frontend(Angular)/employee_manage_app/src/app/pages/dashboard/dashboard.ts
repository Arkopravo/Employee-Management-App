import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Master } from '../../services/master';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  masterService = inject(Master);
  employeeService = inject(EmployeeService);

  // ==============================
  // DATA
  // ==============================

  employeeList = signal<any[]>([]);
  departmentList = signal<any[]>([]);
  designationList = signal<any[]>([]);

  // ==============================
  // DASHBOARD STATS
  // ==============================

  totalEmployees = signal(0);
  totalDepartments = signal(0);
  totalDesignations = signal(0);
  activeEmployees = signal(0);

  // ==============================
  // LOADING
  // ==============================

  isLoading = signal(true);

  // ==============================
  // CONSTRUCTOR
  // ==============================

  constructor() {
    this.loadDashboardData();
  }

  // ==============================
  // LOAD DASHBOARD DATA
  // ==============================

  loadDashboardData() {
    this.isLoading.set(true);

    // Employees
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        console.log('Employees:', res);

        this.employeeList.set(res || []);

        this.totalEmployees.set((res || []).length);

        // If your employee object contains isActive
        this.activeEmployees.set(
          (res || []).filter((employee: any) => employee.isActive === true).length,
        );

        this.isLoading.set(false);
      },

      error: (err) => {
        console.log('Employee API Error:', err);
        this.isLoading.set(false);
      },
    });

    // Departments
    this.masterService.getAllDept().subscribe({
      next: (res: any) => {
        console.log('Departments:', res);

        this.departmentList.set(res || []);

        this.totalDepartments.set((res || []).length);
      },

      error: (err) => {
        console.log('Department API Error:', err);
      },
    });

    // Designations
    this.masterService.getAllDesignations().subscribe({
      next: (res: any) => {
        console.log('Designations:', res);

        this.designationList.set(res || []);

        this.totalDesignations.set((res || []).length);
      },

      error: (err) => {
        console.log('Designation API Error:', err);
      },
    });
  }

  // ==============================
  // GET RECENT EMPLOYEES
  // ==============================

  getRecentEmployees() {
    return this.employeeList().slice().reverse().slice(0, 5);
  }

  // ==============================
  // GET INITIALS
  // ==============================

  getInitial(name: string): string {
    if (!name) {
      return '?';
    }

    return name.charAt(0).toUpperCase();
  }

  // ==============================
  // REFRESH
  // ==============================

  refreshDashboard() {
    this.loadDashboardData();
  }
}
