import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeModel } from '../../models/Employee.model';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, NgIf, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isCollapsed = false;
  loggedEmpData : EmployeeModel = new EmployeeModel();

  constructor() {
    const localData = localStorage.getItem('empLoginUser');
    if(localData != null) {
      this.loggedEmpData = JSON.parse(localData);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    // Clear the user data from local storage
    localStorage.removeItem('empLoginUser');
    // Navigate to the login page
    window.location.href = '/login';
  }
}
