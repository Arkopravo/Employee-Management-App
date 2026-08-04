import { Component, inject, OnInit } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})

export class Department implements OnInit {
  newDeptObj: DepartmentModel = new DepartmentModel();
  masterService = inject(Master);

  deptList : DepartmentModel[] = [];

  ngOnInit() {
    console.log('Department Component Loaded');
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: any) => {
        console.log(result);
      }
    } )
  }

  onSaveDept() {

  }

  onReset() {
    // resetting the form values
    
  }
}
