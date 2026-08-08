import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DepartmentModel } from '../models/Department.model';

@Service()
export class Master {
    http = inject(HttpClient);
    apiUrl : string = 'https://localhost:7038/api/';

    getAllDept() {
        return this.http.get(this.apiUrl + 'DepartmentMaster/GetAllDepartments');
    }

    saveDept(obj: DepartmentModel) {
        return this.http.post(this.apiUrl + 'DepartmentMaster/AddDepartment', obj);
    }

    updateDept(obj: DepartmentModel) {
        return this.http.put(this.apiUrl + 'DepartmentMaster/UpdateDepartment', obj);
    }
}
