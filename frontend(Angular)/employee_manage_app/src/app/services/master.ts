import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DepartmentModel, DesignationModel } from '../models/Department.model';
import { Observable } from 'rxjs';

@Service()
export class Master {
  http = inject(HttpClient);
  apiUrl: string = 'https://localhost:7038/api/';

  // Department
  getAllDept() {
    return this.http.get(this.apiUrl + 'DepartmentMaster/GetAllDepartments');
  }

  saveDept(obj: DepartmentModel) {
    return this.http.post(this.apiUrl + 'DepartmentMaster/AddDepartment', obj);
  }

  updateDept(obj: DepartmentModel) {
    return this.http.put(this.apiUrl + 'DepartmentMaster/UpdateDepartment', obj);
  }

  deleteDept(deptId: number) {
    return this.http.delete(this.apiUrl + 'DepartmentMaster/DeleteDepartment/' + deptId);
  }

  // Designation
  getAllDesignations(): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(this.apiUrl + 'DesignationMaster/GetAllDesignations');
  }

  getDesignationById(id: number) {
    return this.http.get(this.apiUrl + "/DesignationMaster/" + id);
  }

  addDesignation(data: DesignationModel) {
    return this.http.post(this.apiUrl + 'DesignationMaster/AddDesignation', data);
  }

  updateDesignation(id: number) {
    return this.http.put(this.apiUrl + 'DesignationMaster/UpdateDesignation/', id);
  }

  deleteDesignation(id: number) {
    return this.http.delete(this.apiUrl + 'DesignationMaster/' + id);
  }
}
