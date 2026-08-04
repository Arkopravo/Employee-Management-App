import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class Master {
    http = inject(HttpClient);
    apiUrl : string = 'https://localhost:7038/api/';

    getAllDept() {
        return this.http.get(this.apiUrl + 'DepartmentMaster/GetAllDepartments');
    }
}
