import { Component, inject, OnInit, signal } from '@angular/core';
import { isActive, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentModel, DesignationModel } from '../../models/Department.model';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-designation',
  imports: [ReactiveFormsModule, AsyncPipe, FormsModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {
  fb = inject(FormBuilder);
  masterService = inject(Master);
  $designationList: Observable<DesignationModel[]> = new Observable<DesignationModel[]>();
  departmentList: DepartmentModel[] = [];
  isEditMode: boolean = false;

  designationForm!: FormGroup;

  isLoading = signal(false);

  loadDepartments() {
    this.masterService.getAllDept().subscribe((res: any) => {
      this.departmentList = res;
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.loadDepartments();
    this.loadDesignations();
  }

  createForm() {
    this.designationForm = this.fb.group({
      designationId: [0],
      departmentId: [0, Validators.required],
      designationName: ['', Validators.required],
    });
  }

  loadDesignations() {
    this.$designationList = this.masterService.getAllDesignations();
  }

  resetForm() {
    this.isEditMode = false;
    this.designationForm.reset({
      designationId: 0,
      departmentId: 0,
      designationName: '',
    });
  }

  onSave() {
    if (this.designationForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formvalue = this.designationForm.value;
    // console.log("Payload => ", this.designationForm.value);

    this.isLoading.set(true);
    if (this.isEditMode) {
      this.masterService.updateDesignation(formvalue).subscribe(() => {
        alert('Designations updated Successfully');
        this.loadDesignations();
        this.resetForm();
        this.isLoading.set(false);
      });
    } else {
      this.masterService.addDesignation(formvalue).subscribe(() => {
        alert('Designations updated Successfully');
        this.loadDesignations();
        this.resetForm();
        this.isLoading.set(false);
      });
    }
  }

  onEdit(item: DesignationModel) {
    this.isEditMode = true;
    this.designationForm.patchValue({
      designationId: item.designationId,
      departmentId: item.departmentId,
      designationName: item.designationName,
    });
  }

  onDelete(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      this.isLoading.set(true);
      this.masterService.deleteDesignation(id).subscribe(() => {
        alert('Designation Deleted Successfully');
        this.loadDesignations();
        this.isLoading.set(false);
      });
    }
  }

  // newDesignationObj: DesignationModel;
  // constructor() {                 // have to write this constructor if we interface only instead of class
  //   this.newDesignationObj = {
  //     departmentId: 0,
  //     designationName: '',
  //     designationId: 0
  //   }
  // }
}
