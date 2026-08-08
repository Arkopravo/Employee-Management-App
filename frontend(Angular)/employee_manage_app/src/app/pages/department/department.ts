import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [FormsModule, NgClass],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDeptObj: DepartmentModel = new DepartmentModel();
  masterService = inject(Master);

  deptList = signal<DepartmentModel[]>([]);

  ngOnInit() {
    console.log('Department Component Loaded');
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: any) => {
        // console.log(result);
        this.deptList.set(result);
      },
      error: (error: any) => {
        console.log(error);
        
      },
    });
  }

  onSaveDept() {
    this.masterService.saveDept(this.newDeptObj).subscribe({
      next: (result: any) => {
        alert('Department Created Successfully');
        this.newDeptObj = new DepartmentModel();
        this.getAllDepartments();
      },
      error: (err: any) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  onUpdateDept() {
    this.masterService.updateDept(this.newDeptObj).subscribe({
      next: (result: any) => {
        alert('Department Updated Successfully');
        this.newDeptObj = new DepartmentModel();
        this.getAllDepartments();
      },
      error: (err: any) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  onReset() {
    // resetting the form values
    this.newDeptObj = new DepartmentModel();
  }

  onEdit(data: DepartmentModel) {
    this.newDeptObj = data;
  }

  onDelete(data: DepartmentModel) {

  }
}
